import { NgModule } from '@angular/core';
import { LightboxService } from './services/lightbox.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxButtonComponent } from './components/lightbox-button/lightbox-button.component';
import { LightboxImgComponent } from './components/lightbox-img/lightbox-img.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxHeaderComponent } from './components/lightbox-header/lightbox-header.component';
import { DoomService } from './services/doom.service';

@NgModule({
    declarations: [
        LightboxButtonComponent,
        LightboxImgComponent,
        LightboxComponent,
        LightboxHeaderComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        LightboxImgComponent
    ],
    providers: [
        LightboxService,
        DoomService
    ],
    entryComponents: [LightboxComponent]
})
export class LightboxModule { }
