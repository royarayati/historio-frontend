import { ReactNode , useEffect, useState, useContext } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { GlobalContext , refreshAccessIfNeeded } from './AuthUtils';

interface PropsType {
    className?: string,
    children?: ReactNode,
    method?: string,
    path: string,
    headers?: object,
    requestBody?: object,
}

export function ApiFetcher(props: PropsType) {

    const globalContext = useContext(GlobalContext);
    const user = useSelector('auth');

    const [ data , setData ] = useState();

    // TODO: Handle errors
    useEffect(() => {
        refreshAccessIfNeeded(globalContext, user).then(user => {
            if (!user) {
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
                    console.log("Request failed with status: " + response.status);
                }
            })
        });
    })

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