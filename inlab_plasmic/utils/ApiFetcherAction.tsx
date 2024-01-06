import axios from 'axios';
import { InlabUser, refreshAccessIfNeeded, logInDev } from './CommonUtils';

// TODO: Handle errors
export function axiosCall(
    user: InlabUser | null,
    baseUrl: string,
    changeUserCallback: (user: InlabUser | null) => void,
    method: string,
    path: string,
    headers?: any,
    requestBody?: any,
): Promise<any> {
    return refreshAccessIfNeeded({baseUrl, changeUserCallback}, user).then(user => {
        logInDev("axiosCall: refresh: running...");

        const authedHeaders: object = {
            'Authorization': 'Bearer ' + user?.access,
            ...headers
        };
        axios.request({
            method,
            url: baseUrl + path,
            headers: authedHeaders,
            data: requestBody
        }).then((response) => {
            if (response.status === 200) {
                logInDev("axiosCall: axios: success: " + JSON.stringify(response.data));
                return response.data;
            } else {
                // TODO: A better Error handling needs to be implemented
                logInDev("axiosCall: axios: Request failed with status: " + response.status);
            }
        }).catch((error) => {
            logInDev("axios Call: Request error: " + error);
        });
    }).catch((error) => {
        logInDev("axiosCall: refresh: error: " + error);
    })
}
