import { TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxDoomService } from '../../services/lightbox-doom.service';
import { LightboxPanelComponent } from '../lightbox-panel/lightbox-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxOverlayContainerService } from '../../services/lightbox-overlay-container.service';
import { LightboxImgComponent } from '../lightbox-img/lightbox-img.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LightboxVideoComponent } from '../lightbox-video/lightbox-video.component';

@NgModule({
    declarations: [
        LightboxPanelComponent,
        LightboxImgComponent,
        LightboxVideoComponent,
        LightboxButtonComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    entryComponents: [
        LightboxPanelComponent
    ]
})
class TestModule {}

describe('Create LightboxComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxComponent
            ],
            imports: [
                TestModule
            ],
            providers: [
                LightboxService,
                LightboxDoomService,
                LightboxOverlayContainerService
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxComponent);
        expect(fixture.componentInstance instanceof LightboxComponent).toBe(
            true,
            'should create LightboxComponent'
        );
    });
});
