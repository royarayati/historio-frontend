import {
  ReactNode,
  useEffect,
  useState,
  useContext,
  forwardRef,
  useImperativeHandle,
  useCallback,
  createContext,
} from "react";
import { useSelector } from "@plasmicapp/react-web/lib/host";
import axios from "axios";
import { refreshUser } from "./CommonUtils";
import { GlobalContext } from "./types/CommonTypes";
import { 
  setCache, 
  getCache, 
  deleteCache
} from "./indexdb/CacheService";

type CacheMode = "yes" | "no";
type CacheStrategy = "cache-first" | "stale-while-revalidate" | "network-first";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

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
  patientId?: string;
  cacheStrategy?: CacheStrategy;
  cacheTTL?: number; // Custom TTL in milliseconds
  cacheTags?: string[]; // Tags for cache invalidation
  debugMode?: boolean; // Enable cache debugging
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

export const ApiFetcherContext = createContext<
  FetcherResponse & { loading: boolean }
>({ loading: true });

// Metadata for Plasmic registration
export const ApiFetcherComponentPlusCacheMeta = {
  name: "ApiFetcherComponentPlusCache",
  displayName: "API Fetcher with Cache",
  description: "Enhanced API fetcher with IndexedDB caching support",
  props: {
    className: {
      type: "string" as const,
      displayName: "CSS Class",
    },
    method: {
      type: "choice" as const,
      options: ["GET", "POST", "PUT", "DELETE"],
      displayName: "HTTP Method",
      defaultValue: "GET",
    },
    path: {
      type: "string" as const,
      displayName: "API Path",
      defaultValue: "/api/endpoint",
    },
    headers: {
      type: "object" as const,
      displayName: "Headers",
    },
    requestBody: {
      type: "object" as const,
      displayName: "Request Body",
    },
    delay: {
      type: "number" as const,
      displayName: "Delay (ms)",
    },
    cache: {
      type: "choice" as const,
      options: ["yes", "no"],
      displayName: "Enable Cache",
      defaultValue: "no",
    },
    patientId: {
      type: "string" as const,
      displayName: "Patient ID",
    },
    cacheKey: {
      type: "string" as const,
      displayName: "Cache Key",
    },
    cacheStrategy: {
      type: "choice" as const,
      options: ["cache-first", "stale-while-revalidate", "network-first"],
      displayName: "Cache Strategy",
      defaultValue: "cache-first",
    },
    cacheTTL: {
      type: "number" as const,
      displayName: "Cache TTL (ms)",
      defaultValue: 3600000, // 1 hour
    },
    debugMode: {
      type: "boolean" as const,
      displayName: "Debug Mode",
      defaultValue: false,
    },
  },
  providesData: true,
  importPath: "./utils/ApiFetcherComponentPlusCache",
};

export const ApiFetcherComponentPlusCache = forwardRef<
  ApiActions,
  ApiFetcherProps
>((props, ref) => {
  const globalContext = useContext(GlobalContext);
  const inlabUser = useSelector("inlab_user");

  const [response, setResponse] = useState<FetcherResponse>({});
  const [loading, setLoading] = useState(true);

  /** اطمینان از ورود پارامترهای کش - FAIL-SAFE VALIDATION */
  const validateCacheParams = useCallback(() => {
    if (props.cache === "yes") {
      // Fail-safe: If parameters are invalid, just disable caching (no error)
      if (!props.patientId || typeof props.patientId !== 'string' || props.patientId.trim() === '') {
        console.log(`[CACHE VALIDATION] Invalid patientId, disabling cache: "${props.patientId}" for path: ${props.path}`);
        return false; // Return false instead of throwing error
      }
      if (!props.cacheKey || typeof props.cacheKey !== 'string' || props.cacheKey.trim() === '') {
        console.log(`[CACHE VALIDATION] Invalid cacheKey, disabling cache: "${props.cacheKey}" for path: ${props.path}`);
        return false; // Return false instead of throwing error
      }
      
      // Log the validated parameters
      console.log(`[CACHE VALIDATION] Valid cache parameters - patientId: "${props.patientId.trim()}", cacheKey: "${props.cacheKey.trim()}", path: "${props.path}"`);
      return true; // Parameters are valid
    }
    return false; // Caching is disabled
  }, [props.cache, props.patientId, props.cacheKey, props.path]);

  /** بررسی وجود کش معتبر - FAIL-SAFE CACHE RETRIEVAL */
  const checkCache = useCallback(async (): Promise<unknown | null> => {
    if (props.cache !== "yes") return null;
    
    // Fail-safe: If validation fails, just skip caching
    if (!validateCacheParams()) {
      console.log(`[CACHE CHECK] Cache validation failed, skipping cache for path: ${props.path}`);
      return null;
    }
    
    try {
      // Use trimmed values for consistency
      const patientId = props.patientId!.trim();
      const cacheKey = props.cacheKey!.trim();
      
      console.log(`[CACHE CHECK] Attempting to retrieve cached data for patientId: "${patientId}", cacheKey: "${cacheKey}"`);
      
      const cachedData = await getCache(patientId, cacheKey);
      
      if (cachedData) {
        console.log(`[CACHE CHECK SUCCESS] Found cached data for patientId: "${patientId}", cacheKey: "${cacheKey}"`, {
          dataType: typeof cachedData,
          isArray: Array.isArray(cachedData),
          dataSize: JSON.stringify(cachedData).length
        });
      } else {
        console.log(`[CACHE CHECK MISS] No cached data found for patientId: "${patientId}", cacheKey: "${cacheKey}"`);
      }
      
      return cachedData;
    } catch (error) {
      console.log(`[CACHE CHECK] Error occurred, falling back to API for path: ${props.path}:`, error instanceof Error ? error.message : String(error));
      return null; // Always return null on error, never throw
    }
  }, [props.cache, props.patientId, props.cacheKey, props.path, validateCacheParams]);

  /** دریافت داده تازه از API و ذخیره در کش */
  const fetchFreshData = useCallback(async (): Promise<void> => {
    try {
      const res = await axios.request({
        method: props.method || "GET",
        url: globalContext.baseUrl + props.path,
        headers: {
          Authorization: `Bearer ${inlabUser.access}`,
          ...props.headers,
        },
        data: props.requestBody,
      });

      const responseData = res.data || res;

      if (props.cache === "yes" && validateCacheParams()) {
        try {
          // Use trimmed values for consistency
          const patientId = props.patientId!.trim();
          const cacheKey = props.cacheKey!.trim();
          
          console.log(`[CACHE STORE] Storing fresh data for patientId: "${patientId}", cacheKey: "${cacheKey}"`, {
            path: props.path,
            dataType: typeof responseData,
            isArray: Array.isArray(responseData),
            dataSize: JSON.stringify(responseData).length
          });
          
          await setCache(patientId, cacheKey, responseData);
          
          console.log(`[CACHE STORE SUCCESS] Data successfully stored for patientId: "${patientId}", cacheKey: "${cacheKey}"`);
          
          if (props.debugMode) {
            console.log(`[CACHE DEBUG] Detailed cache info for ${patientId}/${cacheKey}`, {
              data: responseData,
              ttl: props.cacheTTL,
              tags: props.cacheTags,
              path: props.path
            });
          }
        } catch (cacheError) {
          console.log(`[CACHE STORE] Failed to store data, continuing with API response: ${cacheError instanceof Error ? cacheError.message : String(cacheError)}`);
          // Don't throw - we still want to return the data even if caching fails
        }
      } else if (props.cache === "yes") {
        console.log(`[CACHE STORE] Cache validation failed, skipping cache storage for path: ${props.path}`);
      }

      setResponse({
        data: responseData,
        fromCache: false,
        isFresh: true,
        timestamp: Date.now(),
      });
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }, [
    props.method,
    props.path,
    props.headers,
    props.requestBody,
    props.cache,
    props.patientId,
    props.cacheKey,
    props.cacheTTL,
    props.cacheTags,
    props.debugMode,
    globalContext.baseUrl,
    inlabUser.access,
  ]);

  /** مدیریت خطاها و تلاش مجدد در صورت 401 */
  const handleLoadError = useCallback(
    async (error: unknown): Promise<void> => {
      if (axios.isCancel(error)) return;

      if (axios.isAxiosError(error) && error.response?.status === 401) {
        try {
          await refreshUser(
            inlabUser,
            globalContext.baseUrl,
            globalContext.changeUserCallback
          );
          await loadData(); // retry
          return;
        } catch (refreshError) {
          error = refreshError;
        }
      }

      // اگر کش معتبر نداریم، نمایش خطا
      setResponse({
        error: error instanceof Error ? error : new Error(String(error)),
        timestamp: Date.now(),
      });
      setLoading(false);
    },
    [inlabUser, globalContext]
  );

  /** منطق اصلی بارگذاری داده با استراتژی‌های مختلف کش */
  const loadData = useCallback(
    async (forceFresh = false): Promise<void> => {
      setLoading(true);

      try {
        const strategy = props.cacheStrategy || "cache-first";
        
        if (props.debugMode) {
          console.log(`[Cache] Loading data with strategy: ${strategy}`, {
            patientId: props.patientId,
            cacheKey: props.cacheKey,
            forceFresh
          });
        }

        // Cache-First Strategy (default)
        if (strategy === "cache-first" && !forceFresh && props.cache === "yes") {
          const cachedData = await checkCache();
          if (cachedData) {
            if (props.debugMode) {
              console.log(`[Cache] Cache HIT for ${props.patientId}/${props.cacheKey}`);
            }
            setResponse({
              data: cachedData,
              fromCache: true,
              isFresh: true,
              timestamp: Date.now(),
            });
            setLoading(false);
            return;
          }
        }

        // Stale-While-Revalidate Strategy
        if (strategy === "stale-while-revalidate" && !forceFresh && props.cache === "yes") {
          const cachedData = await checkCache();
          if (cachedData) {
            if (props.debugMode) {
              console.log(`[Cache] Serving stale data for ${props.patientId}/${props.cacheKey}, revalidating...`);
            }
            setResponse({
              data: cachedData,
              fromCache: true,
              isFresh: false,
              timestamp: Date.now(),
            });
            setLoading(false);
            
            // Fetch fresh data in background
            fetchFreshData().catch(error => {
              if (props.debugMode) {
                console.warn(`[Cache] Background revalidation failed for ${props.patientId}/${props.cacheKey}:`, error);
              }
            });
            return;
          }
        }

        // Network-First Strategy
        if (strategy === "network-first") {
          try {
            await fetchFreshData();
            return;
          } catch (error) {
            if (props.debugMode) {
              console.log(`[Cache] Network failed, trying cache for ${props.patientId}/${props.cacheKey}`);
            }
            // Fallback to cache on network failure
            const cachedData = await checkCache();
            if (cachedData) {
              setResponse({
                data: cachedData,
                fromCache: true,
                isFresh: false,
                timestamp: Date.now(),
              });
              setLoading(false);
              return;
            }
            throw error; // Re-throw if no cache available
          }
        }

        // Default: fetch fresh data
        await fetchFreshData();
      } catch (error) {
        await handleLoadError(error);
      }
    },
    [props.cache, props.cacheStrategy, props.patientId, props.cacheKey, props.debugMode, checkCache, fetchFreshData, handleLoadError]
  );

  /** بارگذاری اولیه */
  useEffect(() => {
    loadData();
  }, [loadData]);

  /** متدهای قابل دسترسی از بیرون */
  useImperativeHandle(ref, () => ({
    reload: () => loadData(true),
    clearCache: async () => {
      if (props.patientId && props.cacheKey) {
        await deleteCache(props.patientId, props.cacheKey);
        if (props.debugMode) {
          console.log(`[Cache] Cleared cache for ${props.patientId}/${props.cacheKey}`);
        }
      }
    },
  }));

  return (
    <ApiFetcherContext.Provider value={{ ...response, loading }}>
      {props.children}
    </ApiFetcherContext.Provider>
  );
});
