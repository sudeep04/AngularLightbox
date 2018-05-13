import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadingModule } from '@sveguru/lazy-loading';
import { YoutubeModule } from '@sveguru/youtube';
import { LightboxButtonComponent } from './components/lightbox-button/lightbox-button.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxToolbarComponent } from './components/lightbox-toolbar/lightbox-toolbar.component';
import { LightboxImgDirective } from './directives/lightbox-img.directive';
import { LightboxVideoDirective } from './directives/lightbox-video.directive';
import { LightboxItemComponent } from './components/lightbox-item/lightbox-item.component';
import { LightboxImgControlComponent } from './components/lightbox-img-control/lightbox-img-control.component';
import { LightboxThumbnailsComponent } from './components/lightbox-thumbnails/lightbox-thumbnails.component';
import { LightboxService } from './services/lightbox.service';
import { DoomService } from './services/doom.service';
import { LightboxConfigurationService } from './services/lightbox-configuration.service';

@NgModule({
    declarations: [
        LightboxButtonComponent,
        LightboxComponent,
        LightboxToolbarComponent,
        LightboxImgDirective,
        LightboxVideoDirective,
        LightboxItemComponent,
        LightboxImgControlComponent,
        LightboxThumbnailsComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        LazyLoadingModule,
        YoutubeModule
    ],
    exports: [
        LightboxImgDirective,
        LightboxVideoDirective
    ],
    providers: [
        LightboxService,
        DoomService,
        LightboxConfigurationService
    ],
    entryComponents: [LightboxComponent]
})
export class LightboxModule { }
