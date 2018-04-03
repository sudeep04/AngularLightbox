import { NgModule } from '@angular/core';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxImgDirective } from './directives/lightbox-img/lightbox-img.directive';
import { LightboxVideoDirective } from './directives/lightbox-video/lightbox-video.directive';
import { LightboxService } from './services/lightbox.service';
import { LightboxPanelComponent } from './components/lightbox-panel/lightbox-panel.component';
import { LightboxDoomService } from './services/lightbox-doom.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxButtonComponent } from './components/lightbox-button/lightbox-button.component';
import { LightboxImgComponent } from './components/lightbox-img/lightbox-img.component';
import { LightboxOverlayContainerService } from './services/lightbox-overlay-container.service';

@NgModule({
    declarations: [
        LightboxComponent,
        LightboxImgDirective,
        LightboxVideoDirective,
        LightboxPanelComponent,
        LightboxButtonComponent,
        LightboxImgComponent
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
        LightboxOverlayContainerService
    ],
    entryComponents: [LightboxPanelComponent],
})
export class LightboxModule { }
