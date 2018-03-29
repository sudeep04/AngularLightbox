import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppComponent } from '../../components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { ThemingComponent } from './components/Theming/theming.component';
import { ResponsiveComponent } from './components/responsive/responsive.component';
import { ApiComponent } from './components/api/api.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'theming', component: ThemingComponent },
    { path: 'responsive', component: ResponsiveComponent },
    { path: 'api', component: ApiComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
