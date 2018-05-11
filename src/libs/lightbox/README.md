# Angular Lightbox Component

An angular 5 component to display images and videos.

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

## Getting started

### Step 1: Install lightbox component

To be able to use lightbox component you need to install [youtube](https://www.npmjs.com/package/@sveguru/youtube) component and [lazy-loading](https://www.npmjs.com/package/@sveguru/lazy-loading) component too.

```bash
npm install --save @sveguru/lightbox @sveguru/youtube @sveguru/lazy-loading
```
### Step 2: Animations

#### Install Angular animations

Lightbox component depend on the Angular animations in order to be able to do more advanced transitions.

```bash
npm install --save @angular/animations
```

#### Install WebAnimation API and include a polyfill.

[@angular/animations](https://www.npmjs.com/package/@angular/animation) uses the WebAnimation API that isn't supported by all browsers yet.

```bash
npm install --save web-animations-js
```

```bash
import 'web-animations-js';
```

### Step 3: Add Material Icons

To include Material Icons, check out the [Material Icons Guide](https://google.github.io/material-design-icons/).

### Step 4: Import lightbox module

Import lightbox NgModule.

```bash
import {LightboxModule} from '@sveguru/lightbox';

@NgModule({
  ...
  imports: [LightboxModule],
  ...
})
export class AppModule { }
```