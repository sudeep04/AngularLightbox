import { TestBed } from '@angular/core/testing';

import { ApiComponent } from './api.component';

describe('Create ApiComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [ApiComponent] });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(ApiComponent);
        expect(fixture.componentInstance instanceof ApiComponent).toBe(
            true,
            'should create ApiComponent'
        );
    });
});
