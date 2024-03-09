import { createContext } from 'react';

export type InlabUser = null | undefined | {
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
    baseUrl:  'https://inlabgr.synappsgroup.com',
    changeUserCallback: (user: InlabUser) => { },
});
