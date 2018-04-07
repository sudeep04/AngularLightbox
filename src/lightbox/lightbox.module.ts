import { NgModule } from '@angular/core';
import { LightboxService } from './services/lightbox.service';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxButtonComponent } from './components/lightbox-button/lightbox-button.component';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxHeaderComponent } from './components/lightbox-header/lightbox-header.component';
import { DoomService } from './services/doom.service';
import { LightboxImgDirective } from './directives/lightbox-img.directive';
import { LazyLoadingModule } from 'lazy-loading/lazy-loading.module';
import { LightboxItemComponent } from './components/ligthbox-item/lightbox-item.component';

@NgModule({
    declarations: [
        LightboxButtonComponent,
        LightboxComponent,
        LightboxHeaderComponent,
        LightboxImgDirective,
        LightboxItemComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        LazyLoadingModule
    ],
    exports: [
        LightboxImgDirective
    ],
    providers: [
        LightboxService,
        DoomService
    ],
    entryComponents: [LightboxComponent]
})
export class LightboxModule { }
