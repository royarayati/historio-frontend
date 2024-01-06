import axios from 'axios';
import { User } from './AuthUtils';

export function axiosCall(
    method: string,
    path: string,
    headers?: any,
    requestBody?: any,
): Promise<any> {


    return axios.request({
        method,
        url: path,
        headers,
        data: requestBody
    });
}