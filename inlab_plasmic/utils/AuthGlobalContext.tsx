import React, { useEffect, useMemo, useState, useCallback } from "react";

import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

import axios from "axios";

import {
  getDevicedId,
  getCurrentUser,
  logForDev,
  checkUserValidity
} from "./CommonUtils";

import { InlabUser, GlobalContext } from "./types/CommonTypes";
import { axiosCall } from "./ApiFetcherAction";

// Users will be able to set these props in Studio.
interface AuthGlobalContextProps {
  // You might use this to override the auth URL to a test or local URL.
  baseUrl: string;
}

// TODO: We should consider is sending null for all errors is logical or not
//       Does All errors mean user is logouted ?
//       Or error from network or other problems happened ?
export const AuthGlobalContext = ({ children }: React.PropsWithChildren<AuthGlobalContextProps>) => {
  console.log("AuthGlobalContext: Main: START");

  ////////// READ PROPS //////////

  let baseUrl = '';
  if (typeof window !== "undefined") {
    baseUrl = window.env.INLAB_API_URL;
  }

  ///////// SETUP USER //////////

  const [inlabUser, setInlabUser] = useState<InlabUser>(getCurrentUser());
  const [userIsReady, setUserIsReady] = useState(false);

  logForDev("AuthGlobalContext: After useState: inlabUser is " + (typeof inlabUser));

  // Use this function to change user in entire app
  const changeUserCallback = useCallback((newUser: InlabUser) => {

    if (newUser) {
      localStorage.setItem('inlab_user', JSON.stringify(newUser));

    } else {
      localStorage.removeItem('inlab_user');
    }
    logForDev("changeUserCallback: " + (newUser ? "Setting User" : "Setting NULL"));

    setInlabUser(newUser);
  }, []);

  useEffect(() => {
    console.log("AuthGlobalContext: useEffect: START");

    setUserIsReady(checkUserValidity(inlabUser, baseUrl, changeUserCallback));

  }, []);

  ////////// SETUP CONTEXT //////////

  const globalContext = useMemo(() => ({
    baseUrl,
    changeUserCallback
  }), [baseUrl, changeUserCallback]);

  ////////// SETUP ACTIONS //////////

  const actions = useMemo(() => ({
    apiFetcher: async (
      method: string,
      path: string,
      headers?: any,
      requestBody?: any): Promise<any> => {
      return await axiosCall(
        inlabUser,
        baseUrl,
        changeUserCallback,
        method,
        path,
        headers,
        requestBody
      ).then(response => response)
        .catch(error => error)
    },

    login: async (
      username: string,
      password: string
    ): Promise<any> => {
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
      logForDev("AuthGlobalContext: logout: " + (inlabUser ? "User found" : "User is NULL"));
      if (!inlabUser) {
        changeUserCallback(null);
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
          {userIsReady && children}
        </DataProvider>
      </GlobalContext.Provider>
    </GlobalActionsProvider>
  );
}
