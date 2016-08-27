# SystemJS Sample

Proof of concept: Gradually migrating from RequireJS AMD bower to SystemJS ES2015 JSPM

## Motivation

- Implementing new modules in ES2015 while reusing existing AMD modules
- Easy support for multiple versions of the same module on the same page
- Automated wireing for 3rd party libraries without custom 'copy' tasks

## Conditions

- A: Working with existing folder structure
- B: Working with existing modules written in AMD
- C: Working with existing require statements for static assets (e.g. templates)
- D: Working with existing asynchronous require statements (require([...], f))
- E: Working with path alias
- F: Working with bower dependencies

## Current result

- A: OK
- B: Works for most modules (RequireJS specific loaders, such as "domReady", needs to be replaced)
- C: The "text" loader can be replaced with systemjs's "text-plugin" but the path syntax changes*
- D: TODO
- E: OK
- F: TODO

(* e.g. 'myTemplate.html!text' instead of 'text!myTemplate.html')

## Steps to reproduce this setup

- Init project

    npm init

- Install JSPM

    npm install jspm --save-dev

- Add a script entry for JSPM in package.json

    "scripts": {
      "jspm": "jspm"
    }

(allows us to run `npm run webpack`)

- Initialize project for JSPM

    npm run jspm init

(let JSPM prefix its properties, set "webroot" as public base path, choose Babel as transpiler)

- Update .gitignore

    webroot/dist
    webroot/jspm_packages

- Install babel-polyfill

    npm run jspm install babel-polyfill

(as this is not installed by default)

- Move as many 3rd party libraries as possible from bower.json to package.json

    npm run jspm install jquery
    npm run jspm install npm:someLib1
    npm run jspm install github:someLib2

- Tell jshint to allow ES6

    { "esversion": 6 }

(use `"esnext": true` for older versions of jshint, or try to update)

- Install text-plugin

    npm run jspm install text

- Configure path alias

(see webroot/config.js paths)

## Steps for private Gitlab repositories

Install jspm-git

    npm install jspm-git --save-dev

Create a new registry

    npm run jspm registry create mygitlab jspm-git

(Where mygitlab will be the name of your git registry)
