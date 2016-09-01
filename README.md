# Webpack1 Sample

Proof of concept: Gradually migrating from RequireJS AMD bower to Webpack ES6 npm

## Motivation

- Implementing new modules in ES6 while reusing existing AMD modules
- Easy support for multiple versions of the same module on the same page
- Automated wireing for 3rd party libraries without custom 'copy' tasks

## Conditions

- A: Working with existing folder structure
- B: Working with existing modules written in AMD
- C: Working with existing require statements for static assets (e.g. templates)
- D: Working with existing asynchronous require statements (require([...], f))
- E: Working with path alias
- F: Working with bower dependencies
- G: Working with external modules without manual configuration to resolve paths and nested dependencies

## Current result

- A: OK
- B: Works for most modules (RequireJS specific loaders, such as "domReady", needs to be replaced)
- C: The "text" loader can be replaced with Webpack's "raw-loader"
- D: ES6's "system.import" is not supported by Webpack 1 (it kind of works with "require.ensure" but is limited to a static context)
- E: OK
- F: TODO
- G: OK (the "import" for a module in "sample-dependency-amd" works without configuration)

## Steps to reproduce this setup

- Init project

    npm init

- Install Webpack

    npm install webpack --save-dev

- Add a script entry for Webpack in package.json

    "scripts": {
      "webpack": "./node_modules/.bin/webpack --progress --colors"
    }

(allows us to run `npm run webpack`)

- Create `webpack.config.js`

(see the actual file for its content)

- Install Babel and its loader and polyfill

    npm install --save-dev babel-core babel-preset-es2015 babel-loader babel-polyfill

- Create `.babelrc`

    { "presets": [ "es2015" ] }

- Move as many 3rd party libraries as possible from bower.json to package.json

    npm install --save jquery someLib1 someLib2 someLibN

- Tell jshint to allow ES6

    { "esversion": 6 }

(use `"esnext": true` for older versions of jshint, or try to update)

- Install raw-loader and configure an alias 'text' pointing to the raw loader

    npm install --save-dev raw-loader

(for existing require statements using RequireJS's text plugin, e.g. require('text!foo.html'))
