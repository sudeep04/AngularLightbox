import { NgModule } from '@angular/core';
import {
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule
} from '@angular/material';
@NgModule({
    imports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule
    ],
    exports: [
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatListModule,
        MatCardModule,
        MatTabsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatInputModule
    ]
})
export class MaterialModule {}
