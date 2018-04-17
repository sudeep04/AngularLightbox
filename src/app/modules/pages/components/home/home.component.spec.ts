import { TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LightboxComponent } from 'libs/lightbox/components/lightbox/lightbox.component';
import { LightboxModule } from 'libs/lightbox/lightbox.module';

describe('Create HomeComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            imports: [
                MatCardModule,
                MatIconModule,
                FlexLayoutModule,
                LightboxModule
            ]
         });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        expect(fixture.componentInstance instanceof HomeComponent).toBe(
            true,
            'should create HomeComponent'
        );
    });
});
