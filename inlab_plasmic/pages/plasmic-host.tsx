import * as React from 'react';
import { PlasmicCanvasHost, registerComponent, registerGlobalContext } from '@plasmicapp/react-web/lib/host';

import { AuthGlobalContext } from '../utils/AuthGlobalContext';
import { ApiFetcherMeta } from '../utils/ApiFetcherComponent';
import { ApiFetcherComponent } from '../utils/ApiFetcherComponent';
import { UploadFileMeta } from '../utils/UploadFileComponent';
import  UploadFileComponent  from '../utils/UploadFileComponent';


// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// registerComponent(...)
registerGlobalContext(AuthGlobalContext, {
  // name should match GlobalActionsProvider contextName
  name: "AuthGlobalContext",
  // props should match AuthGlobalContextProps
  props: {},
  // providesData should be true if the global context has a DataProvider
  providesData: true,
  // globalActions should match the global context's GlobalActionsProvider
  globalActions: {
    apiFetcher: {
      parameters: [
        { name: "method",
          type: "string",
          displayName: "Method: 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'"
        },
        { name: "path", type: "string" },
        { name: "headers", type: "object" },
        { name: "requestBody", type: "object" },
      ],
    },
    receiveFileApiFetcher: {
      parameters: [
        { name: "method",
          type: "string",
          displayName: "Method: 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'"
        },
        { name: "path", type: "string" },
        { name: "headers", type: "object" },
        { name: "requestBody", type: "object" },
        { name: "responseType",
          type: "string",
          displayName: "Response Type: 'json', 'blob', 'arraybuffer'" }
      ],
    },
    login: {
      parameters: [
        { name: "username", type: "string" },
        { name: "password", type: "string" }
      ]
    },
    logout: { parameters: [] },
  },

  // Specify how generated Plasmic code should import this component;
  // path is relative to srcDir
  importPath: "./utils/AuthGlobalContext",
});

registerComponent(ApiFetcherComponent, ApiFetcherMeta);

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}

registerComponent(UploadFileComponent, UploadFileMeta);