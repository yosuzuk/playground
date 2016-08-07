# Webpack1 Sample

Proof of concept: Gradually migrating from RequireJS AMD bower to Webpack ES6 npm

## Motivation

- Implementing new modules in ES6 while reusing existing AMD modules
- Easy support for multiple versions of the same module on the same page
- Automated wireing for 3rd party libraries without custom 'copy' tasks

## Conditions

- Working with existing folder structure
- Working with existing modules written in AMD
- Working with existing require statements for static assets (e.g. templates)
- Working with existing asynchronous require statements (require([...], f))
- Working with path alias
- Working with bower dependencies

## Steps

Init project

    npm init

Install Webpack

    npm install webpack --save-dev

(missing webpack in PATH, TODO solve, Workaround via script entry in package.json)

Create `webpack.config.js`

Install Babel and its loader and polyfill

    npm install --save-dev babel-core babel-preset-es2015 babel-loader babel-polyfill

Create `.babelrc`

    { "presets": [ "es2015" ] }

Move as many 3rd party libraries as possible from bower.json to package.json

    npm install --save jquery

Tell jshint to allow ES6

    { "esversion": 6 }

( '"esnext": true' is deprecated )

Install raw-loader and configure an alias 'text' pointing to the raw loader

    npm install --save-dev raw-loader

(for existing require statements using RequireJS's text plugin, e.g. require('text!foo.html'))
