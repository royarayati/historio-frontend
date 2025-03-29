import axios from 'axios';
import { refreshAccessIfNeeded, logForDev } from './CommonUtils';
import { InlabUser } from './types/CommonTypes';

export async function axiosCallNew(
  user: InlabUser | null,
  baseUrl: string,
  changeUserCallback: (user: InlabUser | null) => void,
  method: string,
  path: string,
  headers?: any,
  requestBody?: any,
  responseType: 'json' | 'blob' | 'arraybuffer' = 'json' // Add responseType parameter
): Promise<any> {
  return await refreshAccessIfNeeded({ baseUrl, changeUserCallback }, user)
    .then(user => {
      const authedHeaders: object = {
        Authorization: 'Bearer ' + user?.access,
        ...headers,
      };
      return axios.request({
        method,
        url: baseUrl + path,
        headers: authedHeaders,
        data: requestBody,
        responseType: responseType // Add responseType to the request config
      });
    })
    .catch(error => {
      // You should handle errors here
      console.error('API call failed:', error);
      throw error;
    });
}