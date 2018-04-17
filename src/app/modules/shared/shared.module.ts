import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightboxModule } from 'libs/lightbox/lightbox.module';
import { LazyLoadingModule } from 'libs/lazy-loading/lazy-loading.module';

const routes: Routes = [
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        LazyLoadingModule,
        LightboxModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        LazyLoadingModule,
        LightboxModule
    ]
})
export class SharedModule { }
