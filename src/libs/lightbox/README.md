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

```typescript
import 'web-animations-js';
```

### Step 3: Add Material Icons

To include Material Icons, check out the [Material Icons Guide](https://google.github.io/material-design-icons/).

## Usage

### Import lightbox module

Import lightbox NgModule.

```typescript
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

```html
<img lightbox-video 
  [container]="container" 
  [title]="title" 
  [youtube-id]="youtubeVideoId"
  [src]="imageUrl"/>

<img lightbox-img 
  [container]="container" 
  [title]="'title'"
  [src]="imageUrl"/>
```

### Using LightboxConfigurationService

LightboxConfigurationService is used to manipulate lightbox configurations.

```typescript
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

| Name                  | Description                                                      |
|-----------------------|------------------------------------------------------------------|
| container: string     | A label to identify the container. Use different labels to group<br>images on different containers.                                                                                                                         |
| title: string         | The title used on lightbox header.                               |
| src: string           | Default image url.                                               |
| xs-src: string        | Xs image url. Will be used by lazy-loading when the image width<br>is between 0 and 150px (Use xs-breakpoint to change default<br>value).                                                                         |
| sm-src: string        | Sm image url. Will be used by lazy-loading when the image width<br>is between 150px and 300px (Use sm-breakpoint to change<br>default value).                                                                  |
| md-src: string        | Md image url. Will be used by lazy-loading when the image width<br>is between 300px and 600px (Use md-breakpoint to change<br>default value).                                                                  |
| lg-src: string        | Lg image url. Will be used by lazy-loading when the image width<br>is between 600px and 1200px (Use lg-breakpoint to change<br>default value).                                                                  |
| xl-src: string        | Xl image url. Will be used by lazy-loading when the image width<br>be greater than 1200px (Use lg-breakpoint to change default<br>value).                                                                         |
| xs-breakpoint: number | To indicate xs resolution change whenever there is a greater<br>defined.<br>default = 150 |
| sm-breakpoint: number | To indicate sm resolution change whenever there is a greater<br>defined.<br>default = 300 |
| md-breakpoint: number | To indicate md resolution change whenever there is a greater<br>defined.<br>default = 600 |
| lg-breakpoint: number | To indicate lg resolution change whenever there is a greater<br>defined.<br>default = 1200 |

### LightboxVideoDirective

#### Properties

| Name                  | Description                                                      |
|-----------------------|------------------------------------------------------------------|
| container: string     | A label to identify the container. Use different labels to group<br>images on different containers.                                                                                                                         |
| title: string         | The title used on lightbox header.                               |
| src: string           | Default image url.                                               |
| youtube-id: string    | Youtube video id.                                                |
| xs-src: string        | Xs image url. Will be used by lazy-loading when the image width<br>is between 0 and 150px (Use xs-breakpoint to change default<br>value).                                                                         |
| sm-src: string        | Sm image url. Will be used by lazy-loading when the image width<br>is between 150px and 300px (Use sm-breakpoint to change<br>default value).                                                                  |
| md-src: string        | Md image url. Will be used by lazy-loading when the image width<br>is between 300px and 600px (Use md-breakpoint to change<br>default value).                                                                  |
| lg-src: string        | Lg image url. Will be used by lazy-loading when the image width<br>is between 600px and 1200px (Use lg-breakpoint to change<br>default value).                                                                  |
| xl-src: string        | Xl image url. Will be used by lazy-loading when the image width<br>be greater than 1200px (Use lg-breakpoint to change default<br>value).                                                                         |
| xs-breakpoint: number | To indicate xs resolution change whenever there is a greater<br>defined.<br>default = 150 |
| sm-breakpoint: number | To indicate sm resolution change whenever there is a greater<br>defined.<br>default = 300 |
| md-breakpoint: number | To indicate md resolution change whenever there is a greater<br>defined.<br>default = 600 |
| lg-breakpoint: number | To indicate lg resolution change whenever there is a greater<br>defined.<br>default = 1200 |

### LightboxConfigurationService

#### Properties

| Name                                                                   | Description     |
|------------------------------------------------------------------------|-----------------|
| controls.forward:<br>{ disable: boolean; }                             | Forward control configuration.<br>default = { disable: false }                                                                                                             |
| controls.backward:<br>{ disable: boolean; }                            | Backward control configuration.<br>default = { disable: false }                                                                                                            |
| controls.thumbnails:<br>{ disable: boolean; }                          | Thumbnails control configuration.<br>default = { disable: false }                                                                                                          |
| controls.jumpToStart:<br>{ disable: boolean; }                         | Jump to start control configuration.<br>default = { disable: false }                                                                                                       |
| controls.jumpToEnd:<br>{ disable: boolean; }                           | Jump to end control configuration.<br>default = { disable: false }                                                                                                         |
| controls.itemIndex:<br>{ disable: boolean; }                           | Item index control configuration.<br>default = { disable: false }                                                                                                          |
| controls.navigation:<br>{ disable: boolean; }                          | Navigation control configuration.<br>default = { disable: false }                                                                                                          |
| controls.zoom:<br>{ disable: boolean; }                                | Zoom control configuration.<br>default = { disable: false }                                                                                                                |
| controls.zoomIn:<br>{ disable: boolean; }                              | Zoom in control configuration.<br>default = { disable: false }                                                                                                             |
| controls.zoomOut:<br>{ disable: boolean; }                             | Zoom out control configuration.<br>default = { disable: false }                                                                                                            |
| controls.feetToWidth:<br>{ disable: boolean; }                         | Feet to width control configuration.<br>default = { disable: false }                                                                                                       |
| controls.resetZoom:<br>{ disable: boolean; }                           | Reset zoom control configuration.<br>default = { disable: false }                                                                                                          |
| animations.headerShow:<br>{ duration: number; }                        | Header show animation configuration.<br>default = { duration: .4 }                                                                                                         |
| animations.headerHide:<br>{ duration: number; }                        | Header hide animation configuration.<br>default = { duration: .05 }                                                                                                        |
| animations.backgroundFadeIn:<br>{ duration: number; opacity: number; } | Background fade in animation configuration.<br>default = { duration: .4, opacity: .9 }                                                                              |
| animations.backgroundFadeOut:<br>{ duration: number; }                 | Background fade out animation configuration.<br>default = { duration: .05 }                                                                                                |
| animations.thumbnailsShow:<br>{ duration: number; }                    | Thumbnails show animation configuration.<br>default = { duration: .4 }                                                                                                     |
| animations.thumbnailsHide:<br>{ duration: number; }                    | Thumbnails hide animation configuration.<br>default = { duration: .05 }                                                                                                    |
| animations.thumbnailsSlice:<br>{ duration: number; }                   | Thumbnails slice animation configuration.<br>default = { duration: .4 }                                                                                                    |
| animations.zoomShow:<br>{ duration: number; }                          | Zoom show animation configuration.<br>default = { duration: .4 }                                                                                                           |
| animations.zoomHide:<br>{ duration: number; }                          | Zoom hide animation configuration.<br>default = { duration: .05 }                                                                                                          |
| animations.zoomIn:<br>{ duration: number; }                            | Zoom in animation configuration.<br>default = { duration: .4 }                                                                                                             |
| animations.zoomOut:<br>{ duration: number; }                           | Zoom out animation configuration.<br>default = { duration: .4 }                                                                                                            |
| animations.feetToWidth:<br>{ duration: number; }                       | Feet to width animation configuration.<br>default = { duration: .4 }                                                                                                       |
| animations.resetZoom:<br>{ duration: number; }                         | Reset zoom animation configuration.<br>default = { duration: .4 }                                                                                                          |
| animations.itemSlice:<br>{ duration: number; }                         | Item slice animation configuration.<br>default = { duration: .4 }                                                                                                          |
| animations.itemOpen:<br>{ duration: number; }                          | Item open animation configuration.<br>default = { duration: .4 }                                                                                                           |

## Theming

To customize lightbox appearance you can create a theme.

A lightbox .scss theme file will look something like this:

```scss
@import '~@sveguru/lightbox/theming';

$lightbox-theme: (
    thumbnails:(
        background-color: #222,
    ),
    header:(
        background-color: #000,
        color: #fff
    ),
    zoom:(
        background-color: #000,
        color: #fff
    ),
    container:(
        background-color: #000
    )
);

@include lightbox-theme($lightbox-theme);

```

