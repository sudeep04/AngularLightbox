import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadingModule } from '@sveguru/lazy-loading';
import { LightboxModule } from '@sveguru/lightbox';

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
