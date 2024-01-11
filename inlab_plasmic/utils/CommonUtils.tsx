import axios from 'axios';
import { InlabUser, GlobalContextType, GlobalContext } from './CommonTypes';

export function logForDev(logText: string | null) {
    if (logText != null && process.env.NODE_ENV === 'development') {
        console.log(logText)
    }
}

export function getDevicedId(): string {
    let device_id = localStorage.getItem('inlab_device_id');
    if (!device_id) {
        device_id = crypto.randomUUID();
        localStorage.setItem('inlab_device_id', device_id);
    }
    return device_id;
}

export function getCurrentUser(): InlabUser | null {
    const inlabUser = localStorage.getItem('inlab_user');
    if (inlabUser) {
        return JSON.parse(inlabUser);
    } else {
        return null;
    }
}

// This function check for validity of user
// If user is already valid or gets valid after refreshing => resolve user
// If user is null or can not be refreshed => reject null
// If user need refresh but axios error happens => reject error
// If user changes (either refreshed or exipred) =>
// => This function handle the changes itself and call ChangeUserCallback
// note: If user is already null =>  just reject null. but as nothing changed does NOT call ChangeUserCallback
// note: Also if user is already valid => just resolve user. And does NOT call ChangeUserCallback
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
            logForDev("refreshAccessIfNeeded: User is NULL...changeUser => null");
            // changeUserCallback(null);
            reject(null); // User is null, return null

        } else if (!isTokenExpired(inlabUser.access)) {
            logForDev("refreshAccessIfNeeded: Token is Vailid.");
            resolve(inlabUser); // Refresh Token is valid, resolve the promise with the user object

        } else if (isTokenExpired(inlabUser.refresh)) {
            logForDev("refreshAccessIfNeeded: Refresh Token is Expired...changeUser => null");
            changeUserCallback(null);
            reject(null); // Access and Refresh Token have expired, return null.

        } else {
            logForDev("refreshAccessIfNeeded: Refreshing Access...");
            // Refresh the access token
            const requestBody = { refresh: inlabUser.refresh };
            // we must await here and interpret the response
            axios.post(baseUrl + '/api/v2/user/reauth', requestBody)
                .then(response => {
                    if (response.status === 200) {
                        // TODO: better naming for keys maybe?
                        inlabUser.access = response.data.access;
                        changeUserCallback(inlabUser);
                        resolve(inlabUser);
                    } else {
                        // TODO: We should handle 401 error and return user to login page
                        // TODO: A better Error handling needs to be implemented
                        // reject(new Error('refreshAccessToken: Refresh failed with status: ' + response.status));
                        changeUserCallback(null);
                        reject(null);
                    }
                })
                // TODO: A better Error handling needs to be implemented
                .catch(error => {
                    reject(error);
                });
        }
    });
}
