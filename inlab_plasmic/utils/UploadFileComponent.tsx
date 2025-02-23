import { ReactNode, useEffect, useState, useContext, forwardRef, useRef, useImperativeHandle } from 'react';
import { CodeComponentMeta, DataProvider, useSelector } from '@plasmicapp/react-web/lib/host';
import axios from 'axios';
import { refreshAccessIfNeeded, logForDev, refreshUser } from './CommonUtils';
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
      'x_namespace': props.x_namespace,
    };



    // Make the API request
    try {

      const formData = new FormData();
      formData.append('media', media); // assuming media is the file object

      const params = {
        patient_id: props.patientId,
        admission_id: props.admissionId,
        title: props.title,
        description: props.description,
      };

      const response = await axios.post(`${globalContext.baseUrl}/api/v3/patient/media`, formData ,{
        
        headers: {
          ...authedHeaders,
          'Content-Type': 'multipart/form-data',
        },
        params , 
        // params: {
        
        //   patient_id: props.patientId,
        //   admission_id: props.admissionId,
        //   title: props.title,
        //   description: props.description,
        // },
        // data : media ,
      });

      console.log("UploadFileComponent: axios request success: " + response)

      onAxiosSuccess(response);
    } catch (error) {
      onAxiosError(error);
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button onClick={handleFilePickerClick}>
        {props.pickerButtonText || 'Select File'}
      </button>
      {media && <div>Selected File: {media.name}</div>}
      <button onClick={reload} disabled={!media || loading}>
        {props.submitButtonText || 'Submit'}
      </button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <DataProvider name="fetched_data" data={{ loading: loading, ...data }}>
        {props.children}
      </DataProvider>
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
      defaultValue: 'Select File',
      description: 'Text for the file picker button',
    },
    submitButtonText: {
      type: 'string',
      defaultValue: 'Submit',
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