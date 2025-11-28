import { createContext } from 'react';
import { getBaseUrl } from '../getBaseUrl';

export type InlabUser =
  | null
  | undefined
  | {
      access: string;
      refresh: string;
      user: any;
    };

export interface changeUserType {
  (user: InlabUser | null): void;
}

export interface GlobalContextType {
  baseUrl: string;
  changeUserCallback: changeUserType;
}

export const GlobalContext = createContext<GlobalContextType>({
  // Default backend base URL for all API calls from static contexts
  baseUrl: getBaseUrl(),
  changeUserCallback: (user: InlabUser) => {},
});
