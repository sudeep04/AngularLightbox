import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routing';
import { HomeComponent } from './components/home/home.component';
import { ThemingComponent } from './components/Theming/theming.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { ApiComponent } from './components/api/api.component';

@NgModule({
    declarations: [
        HomeComponent,
        ThemingComponent,
        ResponsiveComponent,
        ApiComponent
    ],
    imports: [
        SharedModule,
        PagesRoutingModule
    ]
})
export class PagesModule { }
