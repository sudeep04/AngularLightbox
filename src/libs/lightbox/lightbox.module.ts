import { NgModule } from '@angular/core';
import { LightboxService } from './services/lightbox.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxButtonComponent } from './components/lightbox-button/lightbox-button.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxHeaderComponent } from './components/lightbox-header/lightbox-header.component';
import { DoomService } from './services/doom.service';
import { LightboxImgDirective } from './directives/lightbox-img.directive';
import { LightboxItemComponent } from './components/ligthbox-item/lightbox-item.component';
import { LightboxVideoDirective } from './directives/lightbox-video.directive';
import { YoutubeModule } from 'libs/youtube/youtube.module';
import { LazyLoadingModule } from 'libs/lazy-loading/lazy-loading.module';
import { LightboxImgControlComponent } from './components/lightbox-img-control/lightbox-img-control.component';

@NgModule({
    declarations: [
        LightboxButtonComponent,
        LightboxComponent,
        LightboxHeaderComponent,
        LightboxImgDirective,
        LightboxVideoDirective,
        LightboxItemComponent,
        LightboxImgControlComponent
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
        DoomService
    ],
    entryComponents: [LightboxComponent]
})
export class LightboxModule { }
