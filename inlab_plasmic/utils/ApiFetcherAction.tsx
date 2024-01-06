import axios from 'axios';
import { User, refreshAccessIfNeeded } from './AuthUtils';

// TODO: Handle errors
export function axiosCall(
    user: User | null,
    baseUrl: string,
    changeUserCallback: (user: User | null) => void,
    method: string,
    path: string,
    headers?: any,
    requestBody?: any,
): Promise<any> {
    return refreshAccessIfNeeded({baseUrl, changeUserCallback}, user).then(user => {
        const authedHeaders: object = {
            'Authorization': 'Bearer ' + user?.access,
            ...headers
        };
        axios.request({
            method,
            url: path,
            headers: authedHeaders,
            data: requestBody
        }).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                // TODO: A better Error handling needs to be implemented
                console.log("Request failed with status: " + response.status);
            }
        });
    })
}
