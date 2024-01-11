import { ReactNode, useEffect, useState, useContext } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { refreshAccessIfNeeded, logForDev } from './CommonUtils';
import { GlobalContext } from './CommonTypes';
import { Progress } from 'antd';

interface PropsType {
    className?: string,
    children?: ReactNode,
    method?: string,
    path: string,
    headers?: object,
    requestBody?: object,
    delay?: number,
}

// TODO: We may need to handle axios race condition
export function ApiFetcherComponent(props: PropsType) {


    const globalContext = useContext(GlobalContext);
    const inlabUser = useSelector('inlab_user');

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const twoColors = { "0%": "#108ee9", "100%": "#87d068" };

    useEffect(() => {
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
            {loading && <Progress type="line" percent={100} showInfo={false} status="active" strokeColor={twoColors} strokeLinecap="butt" />}
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
        delay: 'number',
    },
    providesData: true,
    importPath: "./utils/ApiFetcherComponent",
}