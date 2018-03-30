import { NgModule } from '@angular/core';
import { LightboxComponent } from './components/lightbox/lightbox.component';
import { LightboxImgDirective } from './directives/lightbox-img/lightbox-img.directive';
import { LightboxVideoDirective } from './directives/lightbox-video/lightbox-video.directive';

@NgModule({
    declarations: [
        LightboxComponent,
        LightboxImgDirective,
        LightboxVideoDirective
    ],
    imports: [
    ]
})
export class LightboxModule { }
