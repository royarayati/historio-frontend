import * as React from 'react';
import { PlasmicCanvasHost, registerComponent, registerGlobalContext } from '@plasmicapp/react-web/lib/host';

import { MasoodComponent, MasoodMeta } from '../utils/masood';
import { Counter } from '../utils/counter';
import { AuthGlobalContext } from '../utils/AuthGlobalContext';
import { ApiFetcher, ApiFetcherMeta } from '../utils/ApiFetcherComponent';

// You can register any code components that you want to use here; see
// https://docs.plasmic.app/learn/code-components-ref/
// And configure your Plasmic project to use the host url pointing at
// the /plasmic-host page of your nextjs app (for example,
// http://localhost:3000/plasmic-host).  See
// https://docs.plasmic.app/learn/app-hosting/#set-a-plasmic-project-to-use-your-app-host

// registerComponent(...)

registerComponent(MasoodComponent, MasoodMeta);

registerComponent(Counter, {
  name:  'Counter',
  props: {},
  refActions: {
    increment: {
      description: 'Add one to the counter',
      argTypes: []
    },
    decrement: {
      description: 'Subtract one from the counter',
      argTypes: []
    },
    set: {
      description: 'Set the counter to any number',
      argTypes: [
        {
          name: 'count',
          type: 'number'
        }
      ]
    }
  },
  importPath: '../utils/counter'
});

registerGlobalContext(AuthGlobalContext, {
  // name should match GlobalActionsProvider contextName
  name: "AuthGlobalContext",
  // props should match AuthGlobalContextProps
  props: { baseUrl: "string" },
  // providesData should be true if the global context has a DataProvider
  providesData: true,
  // globalActions should match the global context's GlobalActionsProvider
  globalActions: {
    login: { parameters: [
                  { name: "username", type: "string" },
                  { name: "password", type: "string" }
                ]
            },
    logout: { parameters: [] },
  },

  // Specify how generated Plasmic code should import this component;
  // path is relative to srcDir
  importPath: "../utils/AuthGlobalContext",
});

registerComponent(ApiFetcher, ApiFetcherMeta);

export default function PlasmicHost() {
  return <PlasmicCanvasHost />;
}
