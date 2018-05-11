# Angular Lightbox Component 

An angular 5 component to display images and videos as well as a demo application

## Features

* Full screen
* Lazy Loading of large images
* Control elements
  * Navigation (Forward, backward, jump to start/end )
  * Thumbnails
  * Zoom (in, out, feet to with, reset)
* Animated transitions
* Configuration
  * Animations duration
  * Controls elements (enabled/disabled) 
* Theming
* Aot compatibility
* Responsive design

## Content

* demo application
* lightbox component [![npm version](https://badge.fury.io/js/%40sveguru%2Flightbox.svg)](https://badge.fury.io/js/%40sveguru%2Flightbox)
* youtube component (used by lightbox component) [![npm version](https://badge.fury.io/js/%40sveguru%2Fyoutube.svg)](https://badge.fury.io/js/%40sveguru%2Fyoutube)
* lazy-loading component (used by lightbox component) [![npm version](https://badge.fury.io/js/%40sveguru%2Flazy-loading.svg)](https://badge.fury.io/js/%40sveguru%2Flazy-loading)

## Quick start

Make sure you have [node](https://www.npmjs.com/get-npm) version >= 6.0 and [npm](https://www.npmjs.com/get-npm) >= 3

```bash
# clone the repo
git clone --depth 1 https://github.com/sudeep04/AngularLightbox.git

# change directory to our repo
cd AngularLightbox

# install the repo with npm
npm install

# start the server
npm start
```
go to [http://0.0.0.0:3000](http://0.0.0.0:3000) or [http://localhost:3000](http://localhost:3000) in your browser

## Commands

```bash
# build aot for production
npm run build:aot:prod

# build aot for production
npm run build:aot

# build aot for development
npm run build:aot:dev

# build for production
npm run build:prod

# build for development
npm run build:dev

# build for development
npm run build

# run server for development with hot module replacement
npm run server:dev:hmr

# run server with aot for development
npm run server:aot:dev

# run server for development
npm run server:dev

# run server for production
npm run server:prod

# run server for development
npm run server

# run server for production with hot module replacement
npm run start:prod:hmr

# run server for development with hot module replacement
npm run start:hmr

# run server for development
npm run start

# run server with aot for development
npm run start:aot

# publish lightbox component to npm
npm run publish:lightbox

# publish youtube component to npm
npm run publish:youtube

# publish lazy-loading component to npm
npm run publish:lazy-loading

# run test
npm run test

# run tslint
npm run lint
```

## Configuration
Configuration files live in `config/` we are currently using webpack and karma for different stages of your application

## AoT Don'ts
The following are some things that will make AoT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use `form.controls.controlName`, use `form.get(‘controlName’)`
- Don’t use `control.errors?.someError`, use `control.hasError(‘someError’)`
- Don’t use functions in your providers, routes or declarations, export a function and then reference that function name
- @Inputs, @Outputs, View or Content Child(ren), Hostbindings, and any field you use from the template or annotate for Angular should be public

For more detailed guide on AoT's Do's and Don'ts refer to https://github.com/rangle/angular-2-aot-sandbox