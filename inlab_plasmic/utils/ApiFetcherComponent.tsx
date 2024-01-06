import { ReactNode , useEffect, useState, useContext } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { GlobalContext, refreshAccessIfNeeded,  logInDev} from './CommonUtils';

interface PropsType {
    className?: string,
    children?: ReactNode,
    method?: string,
    path: string,
    headers?: object,
    requestBody?: object,
}

// TODO: We may need to handle axios race condition
export function ApiFetcher(props: PropsType) {

    logInDev("ApiFetcher: Rendering ApiFetcherComponent");

    const globalContext = useContext(GlobalContext);
    const inlabUser = useSelector('inlab_user');

    logInDev("ApiFetcher: globalContext: " + JSON.stringify(globalContext));
    logInDev("ApiFetcher: user from useSelector: " + JSON.stringify(inlabUser));

    const [ data , setData ] = useState();

    useEffect(() => {
        logInDev("ApiFetcher: useEffect runned in ApiFetcher. ");
    
        // TODO: Handle errors
        refreshAccessIfNeeded(globalContext, inlabUser).then(user => {
            if (!user) {
                logInDev("ApiFetcher: useEffect: refresh.then => user is null.")
                return;
            }
            const authedHeaders: object = {
                'Authorization': 'Bearer ' + user.access,
                ...props.headers
            };
            axios.request({
                method: props.method || 'GET',
                url: globalContext.baseUrl + props.path,
                headers: authedHeaders,
                data: props.requestBody
            }).then((response) => {
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    // TODO: A better Error handling needs to be implemented
                    logInDev("Request failed with status: " + response.status);
                }
            })
        }).catch(error => {
            logInDev("ApiFetcher: useEffect: refresh.catch => error: " + error);
        });
    }, [props, globalContext, inlabUser]);

    return (
        <div className={props.className}>
            <DataProvider name="fetched_data" data={data}>
                {props.children}
            </DataProvider>
        </div>
    )
}

export const ApiFetcherMeta: CodeComponentMeta<PropsType> = {
    name: "ApiFetcherComponent",
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
    },
    providesData: true,
    importPath: "../utils/ApiFetcherComponent",
}