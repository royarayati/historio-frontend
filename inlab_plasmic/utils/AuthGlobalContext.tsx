import React, { useEffect, useMemo, useState, useContext, useCallback, createContext } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";
import { 
  User, 
  login, 
  logout, 
  getCurrentUser, 
  refreshAccessIfNeeded,
  GlobalContext
 } from "./AuthUtils";
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
  baseUrl = baseUrl || useContext(GlobalContext).baseUrl;

  const [user, setUser] = useState<User | null>(null);

  const changeUserCallback = useCallback((user: User | null) => {
    if (user) {
      localStorage.setItem('inlab_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('inlab_user');
    }
    setUser(user);
  }, []);

  const globalContext = useMemo(() => ({
    baseUrl,
    changeUserCallback
  }), [baseUrl, changeUserCallback]);

  // Get current user on mount
  useEffect(() => {
    refreshAccessIfNeeded( {baseUrl , changeUserCallback} , getCurrentUser())
      .then(user => user)
      .catch(() => setUser(null));
  }, [baseUrl]);

  const actions = useMemo(() => ({
    apiFetcher: (
      method: string,
      path: string,
      headers?: any,
      requestBody?: any) => {
        axiosCall(
          user, 
          baseUrl, 
          changeUserCallback,
          method, 
          path, 
          headers, 
          requestBody,
        ).then(data => data);
      },
    
    login: (username: string, password: string) =>
      login(username, password, baseUrl).then(user => setUser(user)),

    logout: () => logout(user, baseUrl).then(() => setUser(null)),

  }), [baseUrl, changeUserCallback, user]);

  return (
    <GlobalActionsProvider contextName="AuthGlobalContext" actions={actions}>
      <GlobalContext.Provider value={globalContext}>
        <DataProvider name="auth" data={user}>
          {children}
        </DataProvider>
      </GlobalContext.Provider>
    </GlobalActionsProvider>
  );
}