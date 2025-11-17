import axios from 'axios';
import { ReactNode, useEffect, useState, useContext, forwardRef, useRef, useImperativeHandle } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import { refreshAccessIfNeeded , logForDev, refreshUser } from './CommonUtils';
import { GlobalContext } from './types/CommonTypes';
import { set } from '@plasmicapp/react-web';

interface PropsType {
    className?: string;
    children?: ReactNode;
    title: string;
    description: string;
    patientId: string;
    admissionId: string;
    x_namespace: string;
    delay?: number;
    pickerButtonText?: string;
    submitButtonText?: string;
    headers?: object;
}

interface ApiActions {
    reload(): void;
}

const UploadFileComponent = forwardRef<ApiActions, PropsType>((props, ref) => {
    const globalContext = useContext(GlobalContext);
    const inlabUser = useSelector('inlab_user');

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [media, setMedia] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);  
    const isMountedRef = useRef<boolean>(true); // Flag to check if component is mounted

    useEffect(() => {
        return () => {
            isMountedRef.current = false; // Set to false when component unmounts
            if (abortControllerRef.current) {
                abortControllerRef.current.abort(); // Cancel the request
            }
        };
    }, []);



    const reset = () => {
      setMedia(null);
      setError(null);
      setData({});
      setresponseMessage('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleFilePickerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setMedia(event.target.files[0]);
            setError(null);
        } else {
            setMedia(null);
            setError('Please select a file to upload.');
        }
    };

    const onAxiosSuccess = (response: any) => {
        if (isMountedRef.current) { // Check if component is mounted
            logForDev('UploadFileComponent: axios request success: ' + (response.data ? 'Data Fetched' : 'Data Not Fetched'));
            setLoading(false);
            setData(response);
        }
    };

    const onAxiosError = async (error: any) => {
        if (axios.isCancel(error)) {
            return;
        }
        logForDev('UploadFileComponent: axios request error: ' + JSON.stringify(error));

        if (error.response?.status === 401) {
            try {
                await refreshUser(inlabUser, globalContext.baseUrl, globalContext.changeUserCallback);
                await reload();
            } catch (error: any) {
                if (isMountedRef.current) { // Check if component is mounted
                    setLoading(false);
                    setData(error);
                    setError('Failed to refresh user. Please try again.');
                }
            }
        } else {
            if (isMountedRef.current) { // Check if component is mounted
                setLoading(false);
                setData(error);
                setError('An error occurred while uploading the file.');
            }
        }
    };

    const [responseMessage , setresponseMessage] = useState('');

    const reload = async () => {
       
        // Validate file
        if (!media) {
            setError('Please select a file to upload.');
            return;
        }

        // Validate user
        if (!inlabUser) {
            setError('User is not authenticated. Please log in.');
            return;
        }

        // Validate access token
        if (!inlabUser.access) {
            setError('User access token is missing. Please log in again.');
            return;
        }

        setLoading(true);
        setError(null);
        console.log("finish loading");

        // Construct headers
        const authedHeaders = {
            Authorization: 'Bearer ' + inlabUser.access,
            'X-Namespace': props.x_namespace,
        };
        console.log("authedHeaders: ", authedHeaders);

        // Create a new AbortController instance for each request
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        // Make the API request
        try {
            const formData = new FormData();
            formData.append('media', media); // Append the file to the form data

            const params = {
                patient_id: props.patientId,
                admission_id: props.admissionId,
                title: props.title,
                description: props.description,
            };

            const response = await axios.post(`${globalContext.baseUrl}/api/v3/patient/media`, formData, {
                headers: {
                    ...authedHeaders,
                    'Content-Type': 'multipart/form-data', // This is automatically set by axios when using FormData
                },
                params,
                signal: signal, // Pass the signal to axios
            });

            console.log("UploadFileComponent: axios request success: " + response)

            onAxiosSuccess(response);

            console.log('response status: ' , response.status);

            if (response.status === 201) {
                setLoading(false);
                setError(null);
                setData(response);
                // display success message
                setresponseMessage('آپلود با موفقیت انجام شد');

            } else if (response.status === 400) {
                setLoading(false);
                setError('an error occurred while uploading the file.');
                // display error message
                setresponseMessage('آپلود با خطا مواجه شد');
            
            }else if (response.status === 403) {
                setLoading(false);
                setError('media with this title already exists.');
                // display error message
                setresponseMessage('فایلی با این عنوان قبلا آپلود شده است');
            }

           
            
     
        } catch (error) {
            if (axios.isCancel(error)) {
                // Request was cancelled, don't update state
                console.log('Request cancelled');
            } else {
                onAxiosError(error);
            }
        }
    };

    useImperativeHandle(
        ref,
        () => ({
          reload: async () => {
            if (!loading) {
              await reload();
            }
          },
        }),
        [reload, loading]
      );

    return (
        <div className={props.className}>
            <DataProvider name="fetched_data" data={{ loading: loading, ...data }}>
                {props.children}
            </DataProvider>
            <footer>
                <div style={{ marginBottom: 10 }}>
                    <button onClick={handleFilePickerClick}>
                        {props.pickerButtonText || 'انتخاب فایل'}
                    </button>
                    {media && <div>Selected File: {media.name}</div>}
                </div>
                <div>
                    <button onClick={() => reload()} >
                        {(props.submitButtonText || 'آپلود فایل')}
                    </button>
                    {/* <button  onClick = {reset}>
                        انتخاب فایل جدید 
                    </button> */}
                    <br />
                    <span style = {{ color: 'green'}}>
                        {responseMessage}
                    </span>

                </div>
            </footer>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
});

export const UploadFileMeta: CodeComponentMeta<PropsType> = {
    name: 'UploadFileComponent',
    props: {
        children: 'slot',
        title: 'string',
        description: 'string',
        patientId: 'string',
        admissionId: 'string',
        x_namespace: 'string',
        delay: 'number',
        pickerButtonText: {
            type: 'string',
            defaultValue: 'انتخاب فایل',
            description: 'Text for the file picker button',
        },
        submitButtonText: {
            type: 'string',
            defaultValue: 'آپلود فایل',
            description: 'Text for the submit button',
        },
    },
    refActions: {
        reload: {
            description: 'Reload query',
            argTypes: [],
        },
    },
    providesData: true,
    importPath: './utils/UploadFileComponent',
};

export default UploadFileComponent
