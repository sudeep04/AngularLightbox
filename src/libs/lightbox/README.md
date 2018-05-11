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

To be able to use [lightbox component](https://www.npmjs.com/package/@sveguru/lightbox) you need to install [youtube component](https://www.npmjs.com/package/@sveguru/youtube) and [lazy-loading component](https://www.npmjs.com/package/@sveguru/lazy-loading) too.

```bash
npm install --save @sveguru/lightbox @sveguru/youtube @sveguru/lazy-loading
```
### Step 2: Animations

#### Install Angular animations

Lightbox component depend on the Angular animations in order to be able to do more advanced transitions, so you need to install [@angular/animations](https://www.npmjs.com/package/@angular/animation).

```bash
npm install --save @angular/animations
```

#### Install WebAnimation API and include a polyfill.

[@angular/animations](https://www.npmjs.com/package/@angular/animation) uses the WebAnimation API that isn't supported by all browsers yet, so you need to install [web-animations-js](https://www.npmjs.com/package/web-animations-js).

```bash
npm install --save web-animations-js
```

Include web-animations-js in your project.

```bash
import 'web-animations-js';
```

### Step 3: Add Material Icons

To include Material Icons, check out the [Material Icons Guide](https://google.github.io/material-design-icons/).

## Usage

### Import lightbox module

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

### Using LightboxImgDirective and LightboxVideoDirective

LightboxImgDirective and LightboxVideoDirective are used to add images and videos to LightboxComponent and can be grouped using different containers. you need to define the input properties ("title", "container", "src" | "xs-src" | "sm-src" | "md-src" | "lg-src" | "xl-src" and "youtube-id" for LightboxVideoDirective).

```bash
<img lightbox-video 
  [container]="containerName" 
  [title]="title" 
  [youtube-id]="youtubeVideoId"
  [src]="imageUrl"/>

<img lightbox-img 
  [container]="containerName" 
  [title]="'title'"
  [src]="imageUrl"/>
```

### Using LightboxConfigurationService

LightboxConfigurationService is used to manipulate lightbox configurations.

```bash
import { Component, OnInit } from '@angular/core';
import { LightboxConfigurationService } from '@sveguru/lightbox';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(
    private readonly _lightboxConfigurationService: LightboxConfigurationService
  ) { }

  public ngOnInit(): void {

    // disabling forward control.
    this._lightboxConfigurationService.forwardControl = { disable: true };

    // define a five seconds animation duration for background fade in animation and remove transparency.
    this._lightboxConfigurationService.backgroundFadeInAnimation = { duration: 5, opacity: 1 };
  }
}
```

## Api

### LightboxImgDirective

#### Properties

| Name          | Type                                                      | Description  |
|---------------|-----------------------------------------------------------|--------------|
| container     |                                                           |              |
| title         |                                                           |              |
| src           |                                                           |              |
| xs-src        |                                                           |              |
| sm-src        |                                                           |              |
| md-src        |                                                           |              |
| lg-src        |                                                           |              |
| xl-src        |                                                           |              |
| xs-breakpoint |                                                           |              |
| sm-breakpoint |                                                           |              |
| md-breakpoint |                                                           |              |
| lg-breakpoint |                                                           |              |

### LightboxVideoDirective

#### Properties

| Name          | Type                                                      | Description  |
|---------------|-----------------------------------------------------------|--------------|
| container     |                                                           |              |
| title         |                                                           |              |
| youtube-id    |                                                           |              |
| src           |                                                           |              |
| xs-src        |                                                           |              |
| sm-src        |                                                           |              |
| md-src        |                                                           |              |
| lg-src        |                                                           |              |
| xl-src        |                                                           |              |
| xs-breakpoint |                                                           |              |
| sm-breakpoint |                                                           |              |
| md-breakpoint |                                                           |              |
| lg-breakpoint |                                                           |              |

### LightboxConfigurationService

#### Properties

| Name                         | Type                                       | Description  |
|------------------------------|--------------------------------------------|--------------|
| controls.forward             |                                            |              |
| controls.backward            |                                            |              |
| controls.thumbnails          |                                            |              |
| controls.jumpToStart         |                                            |              |
| controls.jumpToEnd           |                                            |              |
| controls.itemIndex           |                                            |              |
| controls.navigation          |                                            |              |
| controls.zoom                |                                            |              |
| controls.zoomIn              |                                            |              |
| controls.zoomOut             |                                            |              |
| controls.feetToWidth         |                                            |              |
| controls.resetZoom           |                                            |              |
| animations.headerShow        |                                            |              |
| animations.headerHide        |                                            |              |
| animations.backgroundFadeIn  |                                            |              |
| animations.backgroundFadeOut |                                            |              |
| animations.thumbnailsShow    |                                            |              |
| animations.thumbnailsHide    |                                            |              |
| animations.thumbnailsSlice   |                                            |              |
| animations.zoomShow          |                                            |              |
| animations.zoomHide          |                                            |              |
| animations.zoomIn            |                                            |              |
| animations.zoomOut           |                                            |              |
| animations.feetToWidth       |                                            |              |
| animations.resetZoom         |                                            |              |
| animations.itemSlice         |                                            |              |
| animations.itemOpen          |                                            |              |

## Theming

