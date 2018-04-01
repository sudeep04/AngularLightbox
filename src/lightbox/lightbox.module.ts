import { NgModule } from '@angular/core';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxImgDirective } from './directives/lightbox-img/lightbox-img.directive';
import { LightboxVideoDirective } from './directives/lightbox-video/lightbox-video.directive';
import { LightboxService } from './services/lightbox.service';
import { OverlayContainer } from './models/overlay-container';
import { LightboxPanelComponent } from './components/lightbox-panel/lightbox-panel.component';
import { LightboxDoomService } from './services/lightbox-doom.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        LightboxComponent,
        LightboxImgDirective,
        LightboxVideoDirective,
        LightboxPanelComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        LightboxComponent,
        LightboxImgDirective,
        LightboxVideoDirective,
        LightboxPanelComponent
    ],
    providers: [
        LightboxService,
        LightboxDoomService,
        OverlayContainer
    ],
    entryComponents: [LightboxPanelComponent],
})
export class LightboxModule { }
