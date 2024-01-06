import React, { useEffect, useMemo, useState, createContext } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";
import { User, BaseUrlContext, login, logout, getCurrentUser, refresh } from "./AuthUtils";
import { axiosCall } from "./ApiFetcherAction";

// Users will be able to set these props in Studio.
interface AuthGlobalContextProps {
  // You might use this to override the auth URL to a test or local URL.
  baseUrl: string;
}

// TODO: We should consider is sending null for all errors is logical or not
//       Does All errors mean user is logouted ?
//       Or error from network or other problems happened ?
export const AuthGlobalContext = ({ children, baseUrl }: React.PropsWithChildren<AuthGlobalContextProps>) => {

  // TODO: Better way to spilit dev / prod environment ?
  baseUrl = baseUrl || process.env.REACT_APP_BASE_URL || 'https://inlabgr.synappsgroup.com:8008';

  const [user, setUser] = useState<User | null>(null);

  // Get current user on mount
  useEffect(() => {
    refresh( baseUrl, getCurrentUser() )
      .then(user => setUser(user))
      .catch(() => setUser(null));

  }, [baseUrl]);

  const actions = useMemo(() => ({
    // apiFetcher: (
    //   method: string,
    //   path: string,
    //   headers?: any,
    //   requestBody?: any) => axiosCall(method, baseUrl + path, headers, requestBody , user),
    login: (username: string, password: string) => 
              login(username, password, baseUrl).then(user => setUser(user)),

    logout: () => logout(user, baseUrl).then(() => setUser(null)),

  }), [baseUrl]);

  return (
    <GlobalActionsProvider contextName="AuthGlobalContext" actions={actions}>
      <BaseUrlContext.Provider value={baseUrl}>
        <DataProvider name="auth" data={user}>  
              {children}
        </DataProvider>
      </BaseUrlContext.Provider>
    </GlobalActionsProvider>
  );
}