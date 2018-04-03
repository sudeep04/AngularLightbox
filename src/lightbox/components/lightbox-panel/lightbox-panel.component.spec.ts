import { TestBed } from '@angular/core/testing';
import { LightboxPanelComponent } from './lightbox-panel.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxImgComponent } from '../lightbox-img/lightbox-img.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LightboxVideoComponent } from '../lightbox-video/lightbox-video.component';

describe('Create LightboxPanelComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxPanelComponent,
                LightboxImgComponent,
                LightboxVideoComponent,
                LightboxButtonComponent
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
