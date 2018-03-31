import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightboxModule } from 'lightbox/lightbox.module';

const routes: Routes = [
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        LightboxModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        LightboxModule
    ]
})
export class SharedModule { }
