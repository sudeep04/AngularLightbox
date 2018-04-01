import { TestBed } from '@angular/core/testing';
import { LightboxPanelComponent } from './lightbox-panel.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Create LightboxPanelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxPanelComponent
            ],
            imports: [
                CommonModule,
                BrowserAnimationsModule
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxPanelComponent);
        expect(fixture.componentInstance instanceof LightboxPanelComponent).toBe(
            true,
            'should create LightboxPanelComponent'
        );
    });
});
