import { ReactNode, useEffect, useState, useContext, forwardRef, useRef, useImperativeHandle } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { refreshAccessIfNeeded , logForDev, refreshUser } from './CommonUtils';
import { GlobalContext } from './types/CommonTypes';

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
    logForDev('UploadFileComponent: axios request success: ' + (response.data ? 'Data Fetched' : 'Data Not Fetched'));
    setLoading(false);
    setData(response);
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
        setLoading(false);
        setData(error);
        setError('Failed to refresh user. Please try again.');
      }
    } else {
      setLoading(false);
      setData(error);
      setError('An error occurred while uploading the file.');
    }
  };

  const reload = async () => {
    logForDev('UploadFileComponent: reload called.');
  
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
  
    // Construct headers
    const authedHeaders = {
      Authorization: 'Bearer ' + inlabUser.access,
      'X-Namespace': props.x_namespace,
    };
    console.log("authedHeaders: ",authedHeaders);
  
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
      });
  
      console.log("UploadFileComponent: axios request success: " + response)
  
      onAxiosSuccess(response);
      return { success : true , data : response.data};
    } catch (error) {
      console.log("UploadFileComponent: axios request error: " + error)
      onAxiosError(error);
      return { success : false , error :"upload error" }
    }
  };
  
  
  
  useImperativeHandle(
    ref,
    () => ({
      reload,
    }),
    [reload]
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
            <button onClick={reload} disabled={!media || loading}>
              {props.submitButtonText || 'آپلود فایل'}
            </button>
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
export default UploadFileComponent;