import { NgModule } from '@angular/core';
import {
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
} from '@angular/material';
@NgModule({
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule
    ],
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule
    ]
})
export class MaterialModule {}
