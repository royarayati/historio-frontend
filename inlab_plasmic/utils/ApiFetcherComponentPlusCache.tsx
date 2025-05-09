import { ReactNode, useEffect, useState, useContext, forwardRef, useImperativeHandle, useCallback } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { refreshAccessIfNeeded, refreshUser } from './CommonUtils';
import { GlobalContext } from './types/CommonTypes';
import { cacheService } from './indexdb/CacheService';

type PatientCacheType = 'lab' | 'radiology' | 'profile';
type CacheMode = 'yes' | 'no';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiFetcherProps {
  className?: string;
  children?: ReactNode;
  method?: HttpMethod;
  path: string;
  headers?: Record<string, string>;
  requestBody?: unknown;
  delay?: number;
  cache?: CacheMode;
  cacheKey?: string;
  cacheType?: PatientCacheType | 'other';
  patientId?: string;
  cacheExpiry?: number;
  debugId?: string;
}

interface ApiActions {
  reload(): void;
  clearCache(): Promise<void>;
}

interface FetcherResponse {
  data?: unknown;
  fromCache?: boolean;
  error?: unknown;
  timestamp?: number;
  isFresh?: boolean;
}

const DEBUG_MODE = process.env.NODE_ENV === 'development';
const logDebug = (...args: unknown[]) => DEBUG_MODE && console.log('[ApiFetcher]', ...args);
const logError = (...args: unknown[]) => console.error('[ApiFetcher]', ...args);

export const ApiFetcherComponentPlusCache = forwardRef<ApiActions, ApiFetcherProps>(
  (props, ref) => {
    const { debugId = 'unknown' } = props;
    const globalContext = useContext(GlobalContext);
    const inlabUser = useSelector('inlab_user');

    const [response, setResponse] = useState<FetcherResponse>({});
    const [loading, setLoading] = useState(true);

    const getCacheKey = useCallback((): string => {
      if (props.cacheKey) return props.cacheKey;
      if (props.cacheType && props.cacheType !== 'other' && props.patientId) {
        return `${props.patientId}_${props.cacheType}`;
      }
      return `api_${props.method || 'GET'}_${props.path}_${JSON.stringify(props.requestBody || {})}`;
    }, [props.cacheKey, props.method, props.path, props.requestBody, props.cacheType, props.patientId]);

    const checkCache = useCallback(async (): Promise<unknown | null> => {
      if (props.cache !== 'yes') return null;

      try {
        const cacheKey = getCacheKey();
        const cachedData = await cacheService.getPatientData(props.patientId || 'api', cacheKey);
        
        if (cachedData) {
          logDebug(`[${debugId}] Retrieved cached data for key: ${cacheKey}`);
          return cachedData;
        }
        return null;
      } catch (error) {
        logError(`[${debugId}] Cache check failed:`, error);
        return null;
      }
    }, [props.cache, props.patientId, getCacheKey, debugId]);

    const updateCache = useCallback(async (responseData: unknown): Promise<void> => {
      if (props.cache !== 'yes') return;

      try {
        const cacheKey = getCacheKey();
        await cacheService.setPatientData(
          props.patientId || 'api', 
          cacheKey, 
          responseData, 
          { ttl: props.cacheExpiry }
        );
      } catch (error) {
        logError(`[${debugId}] Cache update failed:`, error);
      }
    }, [props.cache, props.patientId, props.cacheExpiry, getCacheKey, debugId]);

    const clearCache = useCallback(async (): Promise<void> => {
      try {
        const cacheKey = getCacheKey();
        await cacheService.deletePatientData(props.patientId || 'api', cacheKey);
      } catch (error) {
        logError(`[${debugId}] Cache clear failed:`, error);
      }
    }, [props.patientId, getCacheKey, debugId]);

    const onAxiosSuccess = useCallback(async (axiosResponse: AxiosResponse): Promise<void> => {
      const responseData = axiosResponse.data || axiosResponse;
      
      await updateCache(responseData);
      setResponse({ 
        data: responseData,
        fromCache: false,
        isFresh: true,
        timestamp: Date.now()
      });
      setLoading(false);
    }, [updateCache]);

    const loadData = useCallback(async (): Promise<void> => {
      setLoading(true);
      
      try {
        // 1. First try to get cached data
        const cachedData = await checkCache();
        if (cachedData) {
          setResponse({
            data: cachedData,
            fromCache: true,
            isFresh: false,
            timestamp: Date.now()
          });
          setLoading(false);
        }

        // 2. Make API call
        const authedHeaders = {
          Authorization: 'Bearer ' + inlabUser.access,
          ...props.headers,
        };

        const response = await axios.request({
          method: props.method || 'GET',
          url: globalContext.baseUrl + props.path,
          headers: authedHeaders,
          data: props.requestBody,
        });

        await onAxiosSuccess(response);
      } catch (error) {
        if (axios.isCancel(error)) return;

        if (axios.isAxiosError(error) && error.response?.status === 401) {
          try {
            await refreshUser(inlabUser, globalContext.baseUrl, globalContext.changeUserCallback);
            await loadData(); // Retry after refresh
            return;
          } catch (refreshError) {
            const errorObj = refreshError instanceof Error ? refreshError : new Error(String(refreshError));
            setResponse({
              error: errorObj,
              timestamp: Date.now()
            });
            setLoading(false);
            return;
          }
        }

        const errorObj = error instanceof Error ? error : new Error(String(error));
        setResponse({
          error: errorObj,
          timestamp: Date.now()
        });
        setLoading(false);
      }
    }, [
      checkCache,
      onAxiosSuccess,
      inlabUser,
      props.method,
      props.path,
      props.headers,
      props.requestBody,
      globalContext.baseUrl,
      globalContext.changeUserCallback
    ]);

    useImperativeHandle(
      ref,
      () => ({
        reload: () => loadData().catch(error => {
          logError(`[${debugId}] Reload failed:`, error);
        }),
        clearCache: () => clearCache().catch(error => {
          logError(`[${debugId}] Clear cache failed:`, error);
          throw error;
        })
      }),
      [loadData, clearCache, debugId]
    );

    useEffect(() => {
      const controller = new AbortController();
      const timeout = setTimeout(() => {
        if (inlabUser) {
          refreshAccessIfNeeded(globalContext, inlabUser)
            .then(user => user && loadData())
            .catch(error => {
              logError(`[${debugId}] Initial load failed:`, error);
              setLoading(false);
            });
        }
      }, props.delay || 0);

      return () => {
        controller.abort();
        clearTimeout(timeout);
      };
    }, [loadData, inlabUser, globalContext, props.delay, debugId]);

    return (
      <div className={props.className}>
        <DataProvider name="fetched_data" data={{ loading, ...response }}>
          {props.children}
        </DataProvider>
      </div>
    );
  }
);

export const ApiFetcherComponentPlusCacheMeta: CodeComponentMeta<ApiFetcherProps> = {
  name: 'ApiFetcherComponentPlusCache',
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
    cache: {
      type: 'choice',
      options: ['yes', 'no'],
      defaultValue: 'no',
    },
    cacheKey: {
      type: 'string',
      description: 'Custom key for caching',
    },
    cacheType: {
      type: 'choice',
      options: ['lab', 'radiology', 'profile', 'other'],
      description: 'Type of data being cached',
    },
    patientId: {
      type: 'string',
      description: 'Required for patient-specific caching',
    },
    cacheExpiry: {
      type: 'number',
      description: 'Cache expiration in milliseconds',
    },
    debugId: {
      type: 'string',
      description: 'Identifier for debugging',
    },
  },
  refActions: {
    reload: {
      description: 'Reload query',
      argTypes: [],
    },
    clearCache: {
      description: 'Clear cached data',
      argTypes: [],
    },
  },
  providesData: true,
  importPath: './utils/ApiFetcherComponentPlusCache',
};


