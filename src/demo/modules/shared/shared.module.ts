import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LazyLoadingModule } from '@sveguru/lazy-loading';
import { LightboxModule } from '@sveguru/lightbox';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        LazyLoadingModule,
        LightboxModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        LazyLoadingModule,
        LightboxModule,
        FormsModule
    ]
})
export class SharedModule { }
