import { TestBed } from '@angular/core/testing';
import { LightboxButtonComponent } from './lightbox-button.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Create LightboxButtonComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LightboxButtonComponent],
            imports: [
                CommonModule,
                BrowserAnimationsModule
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxButtonComponent);
        expect(fixture.componentInstance instanceof LightboxButtonComponent).toBe(
            true,
            'should create LightboxButtonComponent'
        );
    });
});
