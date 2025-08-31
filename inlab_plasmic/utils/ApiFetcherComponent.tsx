import { ReactNode, useEffect, useState, useContext, forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { refreshAccessIfNeeded, logForDev, refreshUser } from './CommonUtils';
import { GlobalContext } from './types/CommonTypes';

interface PropsType {
  className?: string;
  children?: ReactNode;
  method?: string;
  path: string;
  headers?: object;
  requestBody?: object;
  delay?: number;
}

interface ApiActions {
  reload(): void;
}

// eslint-disable-next-line react/display-name
export const ApiFetcherComponent = forwardRef<ApiActions, PropsType>((props: PropsType, ref) => {
  logForDev('ApiFetcherComponent: called.');

  const globalContext = useContext(GlobalContext);
  const inlabUser = useSelector('inlab_user');

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const propsRef = useRef(props);
  propsRef.current = props;

  const onAxiosSuccess = (response: any): void => {
    logForDev('ApiFetcherComponent: axios request success: ' + (response.data ? 'Data Fetched' : 'Data Not Fetched'));
    setLoading(false);
    setData(response);
  };

  const onAxiosError = async (error: any) => {
    if (axios.isCancel(error)) {
      return;
    }
    logForDev('ApiFetcherComponent: axios request error: ' + JSON.stringify(error));

    if (error.response?.status === 401) {
      try {
        await refreshUser(inlabUser, globalContext.baseUrl, globalContext.changeUserCallback);
        await reload();
      } catch (error: any) {
        setLoading(false);
        setData(error);
      }
    } else {
      setLoading(false);
      setData(error);
    }
  };

  const reload = useCallback(() => {
    logForDev('ApiFetcherComponent: reload called.');
    setLoading(true);

    const authedHeaders = {
      Authorization: 'Bearer ' + inlabUser?.access,
      ...propsRef.current.headers,
    };
    
    return axios
      .request({
        method: propsRef.current.method || 'GET',
        url: globalContext.baseUrl + propsRef.current.path,
        headers: authedHeaders,
        data: propsRef.current.requestBody,
      })
      .then(onAxiosSuccess)
      .catch(onAxiosError);
  }, [inlabUser?.access, globalContext.baseUrl]);

  useImperativeHandle(
    ref,
    () => ({
      reload() {
        reload();
      },
    }),
    [reload]
  );

  useEffect(() => {
    logForDev('ApiFetcherComponent: useEffect: ' + (inlabUser ? 'User found' : 'User is NULL'));

    const control = new AbortController();
    const searchTimeOut = setTimeout(() => {
      logForDev('ApiFetcherComponent: useEffect: runned: ' + (inlabUser ? 'User found' : 'User is NULL'));
      
      inlabUser &&
        refreshAccessIfNeeded(globalContext, inlabUser)
          .then(user => {
            if (!user) {
              return;
            }

            setLoading(true);

            const authedHeaders = {
              Authorization: 'Bearer ' + inlabUser.access,
              ...propsRef.current.headers,
            };

            axios
              .request({
                method: propsRef.current.method || 'GET',
                url: globalContext.baseUrl + propsRef.current.path,
                headers: authedHeaders,
                data: propsRef.current.requestBody,
                signal: control.signal,
              })
              .then(onAxiosSuccess)
              .catch(onAxiosError);
          })
          .catch(error => {
            logForDev('ApiFetcherComponent: useEffect: Refreshing user failed!!! ');
            setLoading(false);
          });
    }, propsRef.current.delay || 0);

    return () => {
      logForDev('ApiFetcherComponent: useEffect: cleanup');
      control.abort();
      clearTimeout(searchTimeOut);
    };
  }, [
    globalContext.baseUrl,
    inlabUser?.access,
  ]);

  return (
    <div className={props.className}>
      <DataProvider name="fetched_data" data={{ loading: loading, ...data }}>
        {props.children}
      </DataProvider>
    </div>
  );
});

export const ApiFetcherMeta: CodeComponentMeta<PropsType> = {
  name: 'ApiFetcherComponent',
  props: {
    children: 'slot',
    method: {
      type: 'choice',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      defaultValue: 'GET',
    },
    path: 'string',
    headers: 'object',
    requestBody: 'object',
    delay: 'number',
  },
  refActions: {
    reload: {
      description: 'Reload query',
      argTypes: [],
    },
  },
  providesData: true,
  importPath: './utils/ApiFetcherComponent',
};