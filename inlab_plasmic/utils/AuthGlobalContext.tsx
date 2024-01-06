import React, { useEffect, useMemo, useState, useContext, useCallback } from "react";
import { usePathname } from 'next/navigation'

import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

import { 
  InlabUser, 
  login, 
  logout, 
  getCurrentUser, 
  refreshAccessIfNeeded,
  GlobalContext,
  logInDev
 } from "./CommonUtils";
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

  logInDev("AuthGlobalContext: Rendering AuthGlobalContext.");
  // TODO: Better way to spilit dev / prod environment ?
  baseUrl = baseUrl || useContext(GlobalContext).baseUrl;

  const [inlabUser, setInlabUser] = useState<InlabUser | null>(getCurrentUser());

  const changeUserCallback = useCallback((inlabUser: InlabUser | null) => {
    if (inlabUser) {
      localStorage.setItem('inlab_user', JSON.stringify(inlabUser));
      logInDev("changeUserCallback success: " + JSON.stringify(inlabUser));
    } else {
      localStorage.removeItem('inlab_user');
    }
    setInlabUser(inlabUser);
  }, []);

  const globalContext = useMemo(() => ({
    baseUrl,
    changeUserCallback
  }), [baseUrl, changeUserCallback]);

  // Get current user on mount
  useEffect(() => {
    logInDev("AuthGlobalContext: useEffect runned in AuthGlobalContext. ");
    refreshAccessIfNeeded( {baseUrl , changeUserCallback} , inlabUser)
      .then(user => user)
      .catch(() => setInlabUser(null));
  }, [baseUrl]);

  const actions = useMemo(() => ({
    apiFetcher: (
      method: string,
      path: string,
      headers?: any,
      requestBody?: any) => {
        axiosCall(
          inlabUser, 
          baseUrl, 
          changeUserCallback,
          method, 
          path, 
          headers, 
          requestBody,
        ).then(data => {
          logInDev("AuthGlobalContext: apiFetcher: success: " + JSON.stringify(data));
          return data
        });
      },
    
    login: (username: string, password: string) =>
      login(username, password, baseUrl, changeUserCallback)
      .then(inlabUser => setInlabUser(inlabUser))
      .catch(error => console.error(error)),

    logout: () => logout(inlabUser, baseUrl, changeUserCallback).then(() => setInlabUser(null)),

  }), [baseUrl, changeUserCallback, inlabUser]);

  logInDev("AuthGlobalContext: inlabUser: " + JSON.stringify(inlabUser));
  logInDev("AuthGlobalContext: AuthGlobalContext rendered successfully.");

  return (
    <GlobalActionsProvider contextName="AuthGlobalContext" actions={actions}>
      <GlobalContext.Provider value={globalContext}>
        <DataProvider name="inlab_user" data={inlabUser}>
          {children}
        </DataProvider>
      </GlobalContext.Provider>
    </GlobalActionsProvider>
  );
}