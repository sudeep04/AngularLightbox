import { TestBed } from '@angular/core/testing';

import { ResponsiveComponent } from './responsive.component';

describe('Create ResponsiveComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ResponsiveComponent] });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(ResponsiveComponent);
        expect(fixture.componentInstance instanceof ResponsiveComponent).toBe(
            true,
            'should create ResponsiveComponent'
        );
    });
});
