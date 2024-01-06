import { createContext } from 'react';
import axios from 'axios';

export type User = {
    access: string;
    refresh: string;
    user: any;
};

export const BaseUrlContext = createContext<string | undefined>(process.env.REACT_APP_BASE_URL);

export function login(username: string, password: string, authUrl?: string): Promise<User | null> {
    return new Promise((resolve, reject) => {
        // TODO: Generate device_id
        const requestBody = {
            username,
            password,
            device_id: "DEV_ID_0xABA41337CAFE",
            force_logout_other_sessions: true
        };
        axios.post(authUrl + '/api/v2/user/login', requestBody)
            .then(response => {
                if (response.status === 200) {
                    // TODO: better naming for keys maybe?
                    localStorage.setItem('inlab_user', JSON.stringify(response.data));
                    console.log("Login success: " + response.data);
                    resolve(response.data);
                } else {
                    // TODO: A better Error handling needs to be implemented
                    reject(new Error('Login failed with status: ' + response.status));
                }
            })
            // TODO: A better Error handling needs to be implemented
            .catch(error => {
                reject(error);
            });
    });
};

export function logout(user: User | null, authUrl?: string): Promise<void> {
    console.log("Logout - user before logout: " + user);
    // if user is null, there is no need to logout
    if (!user) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        // TODO: Generate device_id
        const requestBody = { refresh: user.refresh };
        axios.post(authUrl + '/api/v2/user/logout', requestBody)
            .then(response => {
                if (response.status === 200) {
                    console.log("Logout success: " + response.status);
                    localStorage.removeItem('inlab_user');
                    resolve();
                } else {
                    // TODO: A better Error handling needs to be implemented
                    reject(new Error('Logout failed with status: ' + response.status));
                }
            })
            // TODO: A better Error handling needs to be implemented
            .catch(error => {
                reject(error);
            });
    });
};

export function getCurrentUser(): User | null {
    const user = localStorage.getItem('inlab_user');
    console.log("getCurrentUser: " + user);

    if (user) {
        return JSON.parse(user);
    } else {
        return null;
    }
}

export function refresh(baseUrl: string, user: User | null): Promise<User | null> {
    return new Promise((resolve, reject) => {
        // TODO: I could not test refresh token function
        //       as can repeat expired token easily

        // Check if the refresh token is not expired
        const isTokenExpired = (token: string) => {
            const payloadBase64 = token.split('.')[1];
            const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
            const decoded = JSON.parse(decodedJson);
            const exp = decoded.exp; // Token's expiration timestamp
            const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

            return exp < now;
        };

        if (!user) {
            console.log("User is null.");
            reject(null); // User is null, return null

        } else if (!isTokenExpired(user.access)) {
            console.log("Access Token is valid.");
            resolve(user); // Refresh Token is valid, resolve the promise with the user object

        } else if (isTokenExpired(user.refresh)) {
            console.log("Refresh Token has expired.");
            reject(null); // Access and Refresh Token have expired, return null.

        } else {
            console.log("Token is about to expire.");
            console.log("baseUrl: " + baseUrl);
            // Refresh the access token
            const requestBody = { refresh: user.refresh };
            axios.post(baseUrl + '/api/v2/user/reauth', requestBody)
                .then(response => {
                    if (response.status === 200) {
                        // TODO: better naming for keys maybe?
                        user.access = response.data.access;
                        localStorage.setItem('inlab_user', JSON.stringify(user));
                        console.log("Refresh success: " + user);
                        resolve(user);
                    } else {
                        // TODO: We should handle 401 error and return user to login page
                        // TODO: A better Error handling needs to be implemented
                        reject(new Error('Refresh failed with status: ' + response.status));
                    }
                })
                // TODO: A better Error handling needs to be implemented
                .catch(error => {
                    reject(error);
                });
        }
    });
}

