import { TestBed } from '@angular/core/testing';
import { LightboxHeaderComponent } from './lightbox-header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Create LightboxHeaderComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LightboxHeaderComponent],
            imports: [
                CommonModule,
                BrowserAnimationsModule
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxHeaderComponent);
        expect(fixture.componentInstance instanceof LightboxHeaderComponent).toBe(
            true,
            'should create LightboxHeaderComponent'
        );
    });
});
