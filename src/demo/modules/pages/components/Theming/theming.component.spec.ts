import { TestBed } from '@angular/core/testing';

import { ThemingComponent } from './theming.component';

describe('Create ThemingComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ThemingComponent] });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(ThemingComponent);
        expect(fixture.componentInstance instanceof ThemingComponent).toBe(
            true,
            'should create ThemingComponent'
        );
    });
});
