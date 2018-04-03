import { TestBed } from '@angular/core/testing';
import { LightboxButtonComponent } from './lightbox-button.component';

describe('Create LightboxButtonComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [LightboxButtonComponent] });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxButtonComponent);
        expect(fixture.componentInstance instanceof LightboxButtonComponent).toBe(
            true,
            'should create LightboxButtonComponent'
        );
    });
});
