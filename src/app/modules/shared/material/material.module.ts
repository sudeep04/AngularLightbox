import { NgModule } from '@angular/core';
import {
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule
} from '@angular/material';
@NgModule({
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule
    ],
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule
    ]
})
export class MaterialModule {}
