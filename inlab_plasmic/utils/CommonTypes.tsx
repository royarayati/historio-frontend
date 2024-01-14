import { createContext } from 'react';

export type InlabUser = {
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
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',
    changeUserCallback: (user: InlabUser | null) => { },
});
