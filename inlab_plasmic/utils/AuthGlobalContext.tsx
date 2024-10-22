import React, { useEffect, useMemo, useState, useCallback, PropsWithChildren } from "react";

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

interface AuthGlobalContextProps {
  // Any props plasmic-studio users want to set as project settings
}

export const AuthGlobalContext = ({ children }: PropsWithChildren<AuthGlobalContextProps>) => {

  ////////// SET BASE URL //////////

  let baseUrl = '';
  if (typeof window !== "undefined") {
    logForDev("AuthGlobalContext: window is defined");
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

  ////////// SETUP GLOBAL ACTIONS //////////

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
        baseUrl + '/api/v3/user/login',
        {
          username,
          password,
          device_id: getDevicedId(),
          force_logout_other_sessions: false
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
      return await axios.post(baseUrl + '/api/v3/user/logout', { refresh: inlabUser.refresh })
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

  console.log("AuthGlobalContext: END: userIsReady: " + userIsReady);

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
