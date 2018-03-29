import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';

const routes: Routes = [
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        MaterialModule
    ]
})
export class SharedModule { }
