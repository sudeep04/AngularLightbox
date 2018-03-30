import { TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';

describe('Create LightboxComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [LightboxComponent] });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxComponent);
        expect(fixture.componentInstance instanceof LightboxComponent).toBe(
            true,
            'should create LightboxComponent'
        );
    });
});
