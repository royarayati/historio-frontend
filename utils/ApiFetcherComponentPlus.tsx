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
  autoFetch?: boolean;
  fetchTrigger?: any;
  fetchTriggers?: any[]; // New prop for multiple triggers
}

interface ApiActions {
  reload(): void;
}

// eslint-disable-next-line react/display-name
export const ApiFetcherComponentPlus = forwardRef<ApiActions, PropsType>((props: PropsType, ref) => {
  logForDev('ApiFetcherComponentPlus: called.');

  const globalContext = useContext(GlobalContext);
  const inlabUser = useSelector('inlab_user');

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const propsRef = useRef(props);
  propsRef.current = props;

  const onAxiosSuccess = (response: any): void => {
    logForDev('ApiFetcherComponentPlus: axios request success: ' + (response.data ? 'Data Fetched' : 'Data Not Fetched'));
    setLoading(false);
    setData(response);
  };

  const onAxiosError = async (error: any) => {
    if (axios.isCancel(error)) {
      return;
    }
    logForDev('ApiFetcherComponentPlus: axios request error: ' + JSON.stringify(error));

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
    logForDev('ApiFetcherComponentPlus: reload called.');
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

  // Helper function to create a stable string representation of triggers
  const getTriggersSignature = useCallback(() => {
    const { fetchTrigger, fetchTriggers } = propsRef.current;
    
    if (fetchTriggers && Array.isArray(fetchTriggers)) {
      // For array of triggers, create a stable string representation
      return fetchTriggers.map(item => {
        if (item === null || item === undefined) return 'null';
        if (typeof item === 'object') return JSON.stringify(item);
        return String(item);
      }).join('|');
    }
    
    if (fetchTrigger !== undefined) {
      // For single trigger
      if (typeof fetchTrigger === 'object') return JSON.stringify(fetchTrigger);
      return String(fetchTrigger);
    }
    
    return '';
  }, []);

  // Initial fetch on mount if autoFetch is enabled
  useEffect(() => {
    if (propsRef.current.autoFetch !== false && inlabUser) {
      logForDev('ApiFetcherComponentPlus: initial fetch');
      
      const control = new AbortController();
      const searchTimeOut = setTimeout(() => {
        inlabUser &&
          refreshAccessIfNeeded(globalContext, inlabUser)
            .then(user => {
              if (!user) return;

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
              logForDev('ApiFetcherComponentPlus: initial fetch failed');
              setLoading(false);
            });
      }, propsRef.current.delay || 0);

      return () => {
        control.abort();
        clearTimeout(searchTimeOut);
      };
    }
  }, [globalContext.baseUrl, inlabUser?.access]);

  // Watch for trigger changes if autoFetch is enabled
  useEffect(() => {
    if (propsRef.current.autoFetch !== false && inlabUser) {
      const triggersSignature = getTriggersSignature();
      logForDev(`ApiFetcherComponentPlus: triggers changed, refetching - ${triggersSignature}`);
      
      const control = new AbortController();
      const searchTimeOut = setTimeout(() => {
        refreshAccessIfNeeded(globalContext, inlabUser)
          .then(user => {
            if (!user) return;

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
            logForDev('ApiFetcherComponentPlus: refetch failed');
            setLoading(false);
          });
      }, propsRef.current.delay || 0);

      return () => {
        control.abort();
        clearTimeout(searchTimeOut);
      };
    }
  }, [
    // This will trigger on any change to the triggers signature
    getTriggersSignature(),
    globalContext.baseUrl,
    inlabUser?.access
  ]);

  return (
    <div className={props.className}>
      <DataProvider name="fetched_data" data={{ loading: loading, ...data }}>
        {props.children}
      </DataProvider>
    </div>
  );
});

export const ApiFetcherMetaPlus: CodeComponentMeta<PropsType> = {
  name: 'ApiFetcherComponentPlus',
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
    autoFetch: {
      type: 'boolean',
      defaultValue: true,
      description: 'Enable automatic fetching on mount and trigger changes',
    },
    fetchTrigger: {
      type: 'object',
      description: 'Trigger refetch when this value changes (single trigger)',
    },
    fetchTriggers: {
      type: 'array',
      description: 'Trigger refetch when any of these values change (multiple triggers)',
    },
  },
  refActions: {
    reload: {
      description: 'Reload query manually',
      argTypes: [],
    },
  },
  providesData: true,
  importPath: './utils/ApiFetcherComponentPlus',
};