import { ReactNode, useEffect, useState, useContext, useMemo } from 'react';
import { CodeComponentMeta, DataProvider, GlobalActionsProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { refreshAccessIfNeeded, logForDev } from './CommonUtils';
import { GlobalContext } from './CommonTypes';

interface PropsType {
    className?: string,
    children?: ReactNode,
    method?: string,
    path: string,
    headers?: object,
    requestBody?: object,
}

// TODO: We may need to handle axios race condition
export function ApiFetcherComponent(props: PropsType) {


    const globalContext = useContext(GlobalContext);
    const inlabUser = useSelector('inlab_user');

    const [data, setData] = useState({});

    useEffect(() => {
        logForDev("ApiFetcherComponent: useEffect: runned: " + (inlabUser ? "User found" : "User is NULL"));
        // TODO: Handle errors
        inlabUser && refreshAccessIfNeeded(globalContext, inlabUser).then(user => {
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
                logForDev("ApiFetcherComponent: axios request success: " + (response.data ? "Data Fetched" : "Data Not Fetched"));
                setData(response);
            }).catch((error) => {
                logForDev("ApiFetcherComponent: axios request error: " + JSON.stringify(error));
                setData(error);
            })
        }).catch(error => { });
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
    importPath: "./utils/ApiFetcherComponent",
}