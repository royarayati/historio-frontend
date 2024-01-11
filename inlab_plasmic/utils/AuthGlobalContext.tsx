import React, { useEffect, useMemo, useState, useContext, useCallback } from "react";
import { useRouter } from 'next/router'

import { DataProvider, GlobalActionsProvider, PlasmicCanvasContext } from "@plasmicapp/host";

import axios from "axios";

import {
  getDevicedId,
  getCurrentUser,
  refreshAccessIfNeeded,
  logForDev
} from "./CommonUtils";
import { InlabUser, GlobalContext } from "./CommonTypes";
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

  ////////// READ PROPS //////////

  baseUrl = baseUrl || useContext(GlobalContext).baseUrl;


  ///////// SETUP USER //////////

  const [inlabUser, setInlabUser] = useState<InlabUser | null>(null);
  logForDev("AuthGlobalContext: After useState: " + (inlabUser ? "User found" : "User is NULL"));

  // Use this function to change stored user in entire app
  // Handle storing new user and routes to login page
  // if user is null
  const changeUserCallback = useCallback((newUser: InlabUser | null) => {
    logForDev("changeUserCallback: " + (newUser ? "Setting User" : "Setting NULL"));
    // const router = useRouter();

    if (newUser) {
      localStorage.setItem('inlab_user', JSON.stringify(newUser));
    } else if (!useContext(PlasmicCanvasContext)){
      // && !router.pathname.startsWith('/login')) {

      localStorage.removeItem('inlab_user');

      logForDev("changeUserCallback: We should redirect to Login here..." )

    } else {
      localStorage.removeItem('inlab_user');
    }
    setInlabUser(newUser);
  }, []);

  useEffect(() => {
    const userOfLocal = getCurrentUser();

    refreshAccessIfNeeded({ baseUrl, changeUserCallback }, userOfLocal)
      .then(user => {
        // We should handle a case here that refreshAccessIfNeeded does not know about it.
        // If user === userOfLocal means localstorage user was valid and nothing changed
        // so we need to render the page by only setting userOfLocal as inlabUser
        if (user === userOfLocal){
          console.log("AuthGlobalContext: refreshAccessIfNeeded: then: user === userOfLocal");
          setInlabUser(user);
        }
      })
      // We may need to handle axios errors here
      .catch(error => {
        // As above if user === userOfLocal means rejected null without calling changeUserCallback
        // So we need to handle it here
        if (userOfLocal === null){
          changeUserCallback(null);
        }
       });

    logForDev("AuthGlobalContext: After refreshAccessIfNeeded: " + (userOfLocal ? "UserOfLocal found" : "UserOfLocal is NULL"));
    logForDev("AuthGlobalContext: After refreshAccessIfNeeded: " + (inlabUser ? "inlabUser found" : "inlabUser is NULL"));
  }, [baseUrl]);

  ////////// SETUP CONTEXT //////////

  const globalContext = useMemo(() => ({
    baseUrl,
    changeUserCallback
  }), [baseUrl, changeUserCallback]);

  ////////// SETUP ACTIONS //////////

  const actions = useMemo(() => ({
    apiFetcher: async function apiFetcher(
      method: string,
      path: string,
      headers?: any,
      requestBody?: any): Promise<any> {
      return await axiosCall(
        inlabUser,
        baseUrl,
        changeUserCallback,
        method,
        path,
        headers,
        requestBody
      ).then(response => response)
        .catch(error => {
          return error
        })
    },

    login: async function callLogin(
      username: string,
      password: string
    ): Promise<any> {
      return await axios.post(
        baseUrl + '/api/v2/user/login',
        {
          username,
          password,
          device_id: getDevicedId(),
          force_logout_other_sessions: true
        })
        .then(response => {
          if (response.status === 200) {
            changeUserCallback(response.data);
          }
          return response;
        })
        .catch(error => {
          return error;
        });
    },

    logout: async (): Promise<any> => {
      if (!inlabUser) {
        return null;
      }
      return await axios.post(baseUrl + '/api/v2/user/logout', { refresh: inlabUser.refresh })
        .then(response => {
          if (response.status === 200) {
            changeUserCallback(null);
            return null;
          }
          return response;
        }).catch(error => {
          return error;
        })
    },

  }), [baseUrl, changeUserCallback, inlabUser]);

  ///////// RETURN PROVIDERS //////////
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
