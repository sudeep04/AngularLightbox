import { NgModule } from '@angular/core';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxImgDirective } from './directives/lightbox-img/lightbox-img.directive';
import { LightboxVideoDirective } from './directives/lightbox-video/lightbox-video.directive';
import { LightboxService } from './services/lightbox.service';

@NgModule({
    declarations: [
        LightboxComponent,
        LightboxImgDirective,
        LightboxVideoDirective
    ],
    providers: [
        LightboxService
    ]
})
export class LightboxModule { }
