#!/bin/bash

set -Ee

# This script can not initialize plasmic 
# if you don't have plasmic project create once using create-plasmic-app

# plasmic.auth file is required in root directory

PLASMIC_PROJECT_ID='wjafXWEvDytFogT7SiMy2v'

echo -e "\n----------Syncing Plasmic----------"

echo -e "\n----------Deleting Plasmic files----------"

rm -r components || true
rm -r pages/patient pages/user pages/consult-list pages/consult-send pages/consult || true
rm -r \
    pages/guide_make_new_page.tsx \
    pages/index.tsx \
    pages/inlab_login.tsx \
    pages/patients.tsx \
    pages/test-auth.tsx || true
rm -r public/plasmic || true
rm plasmic.json || true
rm plasmic.lock || true

echo -e "\n----------Installing npm packages----------"

npm i

echo -e "\n----------Initializing plasmic----------"

npx plasmic init \
    --yes \
    --auth .plasmic.auth \
    --platform "nextjs" \
    --code-lang "ts" \
    --images-scheme "public-files" \
    --images-public-dir "../public" \
    --images-public-url-prefix "/new_inlab/"

echo -e "\n----------Syncing plasmic----------"

npx plasmic sync \
    --yes \
    --auth .plasmic.auth \
    --force \
    --force-overwrite \
    --all-files \
    --projects ${PLASMIC_PROJECT_ID}

echo -e "\n----------PLASMIC SYNC COMPLETE----------"

: << 'END_OF_COMMENT'
What I have learned from plasmic codegen till now.

COMMANDS:
create-plasmic-app : creates a new project. It is like create-nextjs-app but for plasmic.
    It install some plasmic packages and do some configs.
plasmic init: Creates the json config file for plasmic. Does not sync or download project yet.
    Only json config.
plasmic sync: It DOES download and sync the project. The end Calls "plasmic fix-import" to fix import paths.
    Use "plasmic sync --projects PROJECT_ID" to set project_id for the first time.

PLASMIC COMPONENTS:
For each component, Plasmic generates two React components
in two files.  For example, for component TextInput, there
are:

* A blackbox component at plasmic/inlab/PlasmicTextInput.tsx
This is a blackbox, purely-presentational library component
that you can use to render your designs.  This file is owned
by Plasmic, and you should not edit it -- it will be
overwritten when the component design is updated. This
component should only be used by the "wrapper" component
(below).

* A wrapper component at TextInput.tsx
This component is owned and edited by you to instantiate the
PlasmicTextInput component with desired variants, states,
event handlers, and data.  You have complete control over
this file, and this is the actual component that should be
used by the rest of the codebase.

Learn more at https://www.plasmic.app/learn/codegen-guide/


Using Icons
-----------

For each SVG icon, Plasmic also generates a React component.
The component takes in all the usual props that you can pass
to an svg element, and defaults to width/height of 1em.

For example, for the SearchsvgIcon icon at plasmic/inlab/icons/PlasmicIcon__Searchsvg.tsx,
instantiate it like:

    <SearchsvgIcon color="red" />

Learn more at https://www.plasmic.app/learn/other-assets/#icons

SYNC_ABLE PLASMIC FILES:
files synced completely with 'plasmic sync':
/components/plasmic/*
/public/plasmic/*

files synced only thier import paths:
/components/(plasmic compontents)
/pages/(plasmic pages)

these files are created only with create-plasmic-app and does not changed later:
/pages/_app.tsx
/pages/plasmic-host.tsx
/sytles/*

NPM PACKAGES:
plasmic install its basic packages with create-plasmic-app
and install and update other packages with plasmic sync

END_OF_COMMENT
