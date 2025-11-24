
import * as React from 'react';
import { PlasmicCanvasHost, registerComponent, registerGlobalContext } from '@plasmicapp/react-web/lib/host';

import { AuthGlobalContext } from '../utils/AuthGlobalContext';
import { ApiFetcherMeta } from '../utils/ApiFetcherComponent';
import { ApiFetcherComponent } from '../utils/ApiFetcherComponent';
import { UploadFileMeta } from '../utils/UploadFileComponent';
import UploadFileComponent from '../utils/UploadFileComponent';
import { registerFunction } from '@plasmicapp/react-web/lib/host';
import { ApiFetcherComponentPlusCache, ApiFetcherComponentPlusCacheMeta } from '../utils/ApiFetcherComponentPlusCache';
import { ApiFetcherComponentPlus, ApiFetcherMetaPlus } from '../utils/ApiFetcherComponentPlus';
import { processAndCompressBase64 ,compressMultipleBase64Images } from '../utils/ImageCompression';
import SimpleFormBuilder, { SimpleFormBuilderMeta } from '@/components/SimpleFormBuilder';


// Register global context
registerGlobalContext(AuthGlobalContext, {
  name: 'AuthGlobalContext',
  props: {},
  providesData: true,
  globalActions: {
    apiFetcher: {
      parameters: [
        { name: 'method', type: 'string', displayName: "Method: 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'" },
        { name: 'path', type: 'string' },
        { name: 'headers', type: 'object' },
        { name: 'requestBody', type: 'object' },
      ],
    },
    apiFetcherPlus: {
      parameters: [
        { name: 'method', type: 'string', displayName: "Method: 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'" },
        { name: 'path', type: 'string' },
        { name: 'headers', type: 'object' },
        { name: 'requestBody', type: 'object' },
        { name: 'responseType', type: 'string', displayName: "Response Type: 'json', 'blob', 'arraybuffer'" },
      ],
    },
    login: {
      parameters: [
        { name: 'username', type: 'string' },
        { name: 'password', type: 'string' },
      ],
    },
    logout: { parameters: [] },
  },
  importPath: './utils/AuthGlobalContext',
});

// Register code components
registerComponent(ApiFetcherComponent, ApiFetcherMeta);
registerComponent(UploadFileComponent, UploadFileMeta);
registerComponent(ApiFetcherComponentPlusCache, ApiFetcherComponentPlusCacheMeta);
registerComponent(ApiFetcherComponentPlus, ApiFetcherMetaPlus);
registerComponent(SimpleFormBuilder, SimpleFormBuilderMeta);

export const registerAdd = registerFunction(
  processAndCompressBase64,
  {
    name: 'processAndCompressBase64',
    importPath: './utils/ImageCompression.tsx',
    params: [
      {
        name: 'input_base64string',
        type: 'any', // <-- fix here
        description: 'Raw base64 image string'
      },
      {
        name: 'quality',
        type: 'any', // <-- fix here
        description: 'JPEG compression quality (0.1 to 1.0)'
      }
    ]
  }
);

export const registerAdd2 = registerFunction(
  compressMultipleBase64Images,
  {
    name: 'CompressMultipleBase64',
    importPath: './utils/ImageCompression.tsx',
    params: [
      {
        name: 'input_base64strings',
        type: 'array', // <-- fix here
        description: 'Raw base64 image strings'
      },
      {
        name: 'quality',
        type: 'any', // <-- fix here
        description: 'JPEG compression quality (0.1 to 1.0)'
      }
    ]
  }
);

// Export Plasmic host
export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}