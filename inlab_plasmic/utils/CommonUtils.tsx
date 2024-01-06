import { createContext } from 'react';
import axios from 'axios';

export type InlabUser = {
    access: string;
    refresh: string;
    user: any;
};

export interface changeUserType {
    (user: InlabUser | null): void;
}

interface GlobalContextType {
    baseUrl: string;
    changeUserCallback: changeUserType;
}

export const GlobalContext = createContext<GlobalContextType>({
    baseUrl: process.env.REACT_APP_BASE_URL || '',
    changeUserCallback: (user: InlabUser | null) => { },
});

export function logInDev(logText: string | null) {
    if (logText != null && process.env.NODE_ENV === 'development') {
        console.log(logText)
    }
}

export function login(
    username: string,
    password: string,
    baseUrl: string,
    changeUserCallback: changeUserType ): Promise<InlabUser | null> {
    return new Promise((resolve, reject) => {

        let device_id = localStorage.getItem('inlab_device_id');
        if (!device_id) {
            device_id = crypto.randomUUID();
            localStorage.setItem('inlab_device_id', device_id);
        }

        const requestBody = {
            username,
            password,
            device_id: device_id,
            force_logout_other_sessions: true
        };
        axios.post(baseUrl + '/api/v2/user/login', requestBody)
            .then(response => {
                if (response.status === 200) {
                    changeUserCallback(response.data);
                    resolve(response.data);
                } else {
                    // TODO: A better Error handling needs to be implemented
                    reject(new Error('Login failed with status: ' + response.status));
                }
            })
            // TODO: A better Error handling needs to be implemented
            .catch(error => {
                reject('Login error: ' + error);
            });
    });
};

export function logout(inlabUser: InlabUser | null, baseUrl: string, changeUserCallback: changeUserType): Promise<void> {
    logInDev("Logout - user before logout: " + inlabUser);
    // If user is not logged in then do nothing
    if (!inlabUser) {
        changeUserCallback(null);
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const requestBody = { refresh: inlabUser.refresh };
        axios.post(baseUrl + '/api/v2/user/logout', requestBody)
            .then(response => {
                if (response.status === 200) {
                    changeUserCallback(null);
                    resolve();
                } else {
                    // TODO: A better Error handling needs to be implemented
                    reject(new Error('Logout failed with status: ' + response.status));
                }
            })
            // TODO: A better Error handling needs to be implemented
            .catch(error => {
                reject('Logout error: ' + error);
            });
    });
};

export function getCurrentUser(): InlabUser | null {
    const inlabUser = localStorage.getItem('inlab_user');
    logInDev("getCurrentUser: " + inlabUser);

    if (inlabUser) {
        logInDev("getCurrentUser: user returened with value.");
        return JSON.parse(inlabUser);
    } else {
        logInDev("getCurrentUser: user returened null.");
        return null;
    }
}

export function refreshAccessIfNeeded(globalContext: GlobalContextType, inlabUser: InlabUser | null): Promise<InlabUser | null> {
    return new Promise((resolve, reject) => {

        const { baseUrl, changeUserCallback } = globalContext;
        // Check if the refresh token is not expired
        const isTokenExpired = (token: string) => {
            const payloadBase64 = token.split('.')[1];
            const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
            const decoded = JSON.parse(decodedJson);
            const exp = decoded.exp; // Token's expiration timestamp
            const now = Math.floor(Date.now() / 1000); // Current timestamp in seconds

            return exp < now;
        };

        if (!inlabUser) {
            logInDev("refreshAccessToken: User is null.");
            changeUserCallback(null);
            reject(null); // User is null, return null

        } else if (!isTokenExpired(inlabUser.access)) {
            logInDev("refreshAccessToken: Access Token is valid.");
            resolve(inlabUser); // Refresh Token is valid, resolve the promise with the user object

        } else if (isTokenExpired(inlabUser.refresh)) {
            logInDev("refreshAccessToken: Refresh Token has expired.");
            changeUserCallback(null);
            reject(null); // Access and Refresh Token have expired, return null.

        } else {
            logInDev("refreshAccessToken: Token is about to expire.");
            logInDev("refreshAccessToken: baseUrl: " + baseUrl);
            // Refresh the access token
            const requestBody = { refresh: inlabUser.refresh };
            axios.post(baseUrl + '/api/v2/user/reauth', requestBody)
                .then(response => {
                    if (response.status === 200) {
                        // TODO: better naming for keys maybe?
                        inlabUser.access = response.data.access;
                        changeUserCallback(inlabUser);
                        logInDev("refreshAccessToken: Refresh success: " + inlabUser);
                        resolve(inlabUser);
                    } else {
                        // TODO: We should handle 401 error and return user to login page
                        // TODO: A better Error handling needs to be implemented
                        reject(new Error('refreshAccessToken: Refresh failed with status: ' + response.status));
                    }
                })
                // TODO: A better Error handling needs to be implemented
                .catch(error => {
                    reject(error);
                });
        }
    });
}
