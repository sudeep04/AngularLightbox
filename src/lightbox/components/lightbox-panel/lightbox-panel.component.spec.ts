import { TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';
import { LightboxPanelComponent } from './lightbox-panel.component';

describe('Create LightboxPanelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [LightboxPanelComponent] });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxPanelComponent);
        expect(fixture.componentInstance instanceof LightboxPanelComponent).toBe(
            true,
            'should create LightboxPanelComponent'
        );
    });
});
