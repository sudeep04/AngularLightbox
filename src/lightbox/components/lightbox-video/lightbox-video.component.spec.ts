import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxVideoComponent } from './lightbox-video.component';

describe('Create LightboxVideoComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxVideoComponent
            ],
            imports: [
                CommonModule,
                BrowserAnimationsModule
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxVideoComponent);
        expect(fixture.componentInstance instanceof LightboxVideoComponent).toBe(
            true,
            'should create LightboxVideoComponent'
        );
    });
});
