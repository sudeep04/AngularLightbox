import { NgModule } from '@angular/core';
import { DoomSensorService } from './services/doom-sensor.service';
import { LazyLoadingDirective } from './directives/lazy-loading.directive';

@NgModule({
    declarations: [
        LazyLoadingDirective
    ],
    exports: [
        LazyLoadingDirective
    ],
    providers: [
        DoomSensorService
    ]
})
export class LazyLoadingModule { }
