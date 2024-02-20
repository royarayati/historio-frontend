import { ReactNode, useEffect, useState, useContext, forwardRef, useImperativeHandle } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { refreshAccessIfNeeded, logForDev } from './CommonUtils';
import { GlobalContext } from './types/CommonTypes';

interface PropsType {
    className?: string,
    children?: ReactNode,
    method?: string,
    path: string,
    headers?: object,
    requestBody?: object,
    delay?: number,
    dependsOn?: object,
}

interface ApiActions {
    reload(): void;
}

export const ApiFetcherComponent = forwardRef<ApiActions, PropsType>(function ApiFetcherComponent(props: PropsType, ref) {

    const globalContext = useContext(GlobalContext);
    const inlabUser = useSelector('inlab_user');

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    useImperativeHandle(
        ref,
        () => {
            return {
                reload() {
                    console.log("ApiFetcherComponent: refActions: reload")
                }
            };
        },
        []
    );

    useEffect(() => {
        logForDev("ApiFetcherComponent: useEffect: " + (inlabUser ? "User found" : "User is NULL"));

        const control = new AbortController();
        const searchTimeOut = setTimeout(() => {

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

                setLoading(true);

                axios.request({
                    method: props.method || 'GET',
                    url: globalContext.baseUrl + props.path,
                    headers: authedHeaders,
                    data: props.requestBody,
                    signal: control.signal,
                }).then((response) => {
                    logForDev("ApiFetcherComponent: axios request success: " + (response.data ? "Data Fetched" : "Data Not Fetched"));
                    setLoading(false);
                    setData(response);
                }).catch((error) => {
                    if (axios.isCancel(error)) {
                        return;
                    }
                    logForDev("ApiFetcherComponent: axios request error: " + JSON.stringify(error));
                    setLoading(false);
                    setData(error);
                })



            }).catch(error => { });

        }, props.delay || 0);

        return () => {
            control.abort();
            clearTimeout(searchTimeOut);
        }
    }, [props, globalContext, inlabUser]);

    return (
        <div className={props.className}>
            <DataProvider name="fetched_data" data={{ "loading": loading, ...data }}>
                {props.children}
            </DataProvider>
        </div>
    )
})

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
        delay: 'number',
        dependsOn: 'object',
    },
    refActions: {
        reload: {
            description: "Reload query",
            argTypes: [],
        }
    },
    providesData: true,
    importPath: "./utils/ApiFetcherComponent",
}