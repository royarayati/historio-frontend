import { ReactNode, useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
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

  const onAxiosSuccess = (response: any): void => {
    logForDev('ApiFetcherComponent: axios request success: ' + (response.data ? 'Data Fetched' : 'Data Not Fetched'));
    setLoading(false);
    setData(response);
  };

  //     // function onAxiosError(error: any): void {
  const onAxiosError = async (error: any) => {
    if (axios.isCancel(error)) {
      return;
    }
    logForDev('ApiFetcherComponent: axios request error: ' + JSON.stringify(error));

    if (error.response.status === 401) {
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

  const reload = () => {
    logForDev('ApiFetcherComponent: reload called.');
    setLoading(true);

    const authedHeaders = {
      Authorization: 'Bearer ' + inlabUser.access,
      ...props.headers,
    };
    

    return axios
      .request({
        method: props.method || 'GET',
        url: globalContext.baseUrl + props.path,
        headers: authedHeaders,
        data: props.requestBody,
      })
      .then(onAxiosSuccess)
      .catch(onAxiosError);
  };

  useImperativeHandle(
    ref,
    () => ({
      reload() {
        reload();
      },
    }),
    // [props.path, props.headers, props.method, props.requestBody, inlabUser, globalContext.baseUrl]
    [props, globalContext, inlabUser],
  );

  useEffect(() => {
    logForDev('ApiFetcherComponent: useEffect: ' + (inlabUser ? 'User found' : 'User is NULL'));

    const control = new AbortController();
    const searchTimeOut = setTimeout(() => {
      logForDev('ApiFetcherComponent: useEffect: runned: ' + (inlabUser ? 'User found' : 'User is NULL'));
      // TODO: Handle errors
      inlabUser &&
        refreshAccessIfNeeded(globalContext, inlabUser)
          .then(user => {
            if (!user) {
              return;
            }

            setLoading(true);

            const authedHeaders = {
              Authorization: 'Bearer ' + inlabUser.access,
              ...props.headers,
            };

            axios
              .request({
                method: props.method || 'GET',
                url: globalContext.baseUrl + props.path,
                headers: authedHeaders,
                data: props.requestBody,
                signal: control.signal,
              })
              .then(onAxiosSuccess)
              .catch(onAxiosError);
          })
          .catch(error => {
            // TODO: Handle errors of refreshing user
            logForDev('ApiFetcherComponent: useEffect: Refreshing user failed!!! ');
            setLoading(false);
          });
    }, props.delay || 0);

    return () => {
      // useEffect return. Cleanup.
      logForDev('ApiFetcherComponent: useEffect: cleanup');
      control.abort();
      clearTimeout(searchTimeOut);
    };
  }, [
    globalContext,
    globalContext.baseUrl,
    globalContext.changeUserCallback,
    inlabUser,
    props.method,
    props.path,
    props.headers,
    props.requestBody,
    props.delay,
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


// import { ReactNode, useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
// import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
// import axios from 'axios';
// import { refreshAccessIfNeeded, logForDev, refreshUser } from './CommonUtils';
// import { GlobalContext } from './types/CommonTypes';
// import { axiosCall } from './ApiFetcherAction';

// interface PropsType {
//   className?: string;
//   children?: ReactNode;
//   method?: string;
//   path: string;
//   headers?: object;
//   requestBody?: object;
//   delay?: number;
//   file?: File;
// }

// interface ApiActions {
//   reload(): void;
// }

// const ApiFetcherComponent = forwardRef<ApiActions, PropsType>((props, ref) => {
//   const globalContext = useContext(GlobalContext);
//   const inlabUser = useSelector('inlab_user');

//   const [data, setData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setFile(event.target.files[0]);
//     } else {
//       setFile(null);
//     }
//   };

//   const onAxiosSuccess = (response: any) => {
//     logForDev('ApiFetcherComponent: axios request success');
//     setLoading(false);
//     setData(response.data);
//   };

//   const onAxiosError = async (error: any) => {
//     if (axios.isCancel(error)) {
//       return;
//     }
//     logForDev('ApiFetcherComponent: axios request error');
//     setLoading(false);
//     setData(error);
//   };

//   const reload = async () => {
//     logForDev('ApiFetcherComponent: reload called');
//     setLoading(true);

//     try {
//       const authedHeaders = {
//         Authorization: `Bearer ${inlabUser.access}`,
//         ...props.headers,
//       };

//       if (file) {
//         const formData = new FormData();
//         formData.append('file', file);

//         await axiosCall(
//           inlabUser,
//           globalContext.baseUrl,
//           globalContext.changeUserCallback,
//           props.method || 'POST',
//           props.path,
//           props.headers,
//           formData,
//         );
//       } else {
//         await axios.request({
//           method: props.method || 'GET',
//           url: `${globalContext.baseUrl}${props.path}`,
//           headers: authedHeaders,
//           data: props.requestBody,
//         });
//       }
//     } catch (error) {
//       onAxiosError(error);
//     }
//   };

//   useImperativeHandle(ref, () => ({ reload }), [props, globalContext, inlabUser]);

//   useEffect(() => {
//     logForDev('ApiFetcherComponent: useEffect');
//     const timeoutId = setTimeout(async () => {
//       try {
//         await refreshAccessIfNeeded(globalContext, inlabUser);
//         await reload();
//       } catch (error) {
//         logForDev('ApiFetcherComponent: useEffect error');
//       }
//     }, props.delay || 0);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [props, globalContext, inlabUser]);

//   return (
//     <div>
//       {loading ? (
//         <div>Loading...</div>
//       ) : (
//         <div>
//           {data && (
//             <div>
//               <h2>Data:</h2>
//               <pre>{JSON.stringify(data, null, 2)}</pre>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// });

// export const ApiFetcherMeta: CodeComponentMeta<PropsType> = {
//   name: 'ApiFetcherComponent',
//   props: {
//     children: 'slot',
//     method: {
//       type: 'choice',
//       options: ['GET', 'POST', 'PUT', 'DELETE'],
//       defaultValue: 'GET',
//     },
//     path: 'string',
//     headers: 'object',
//     requestBody: 'object',
//     delay: 'number',
//   },
//   refActions: {
//     reload: {
//       description: 'Reload query',
//       argTypes: [],
//     },
//   },
//   providesData: true,
//   importPath: './utils/ApiFetcherComponent',
// };

// export default ApiFetcherComponent;