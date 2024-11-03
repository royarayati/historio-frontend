import axios from 'axios';
import { refreshAccessIfNeeded, logForDev } from './CommonUtils';
import { InlabUser } from './types/CommonTypes';

// TODO: Handle errors
export async function axiosCall( // TODO: better name
  user: InlabUser | null,
  baseUrl: string,
  changeUserCallback: (user: InlabUser | null) => void,
  method: string,
  path: string,
  headers?: any,
  requestBody?: any,
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
      });
    })
    .catch(error => {});
}
