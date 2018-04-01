import { TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxDoomService } from '../../services/lightbox-doom.service';
import { OverlayContainer } from '../../models/overlay-container';
import { LightboxPanelComponent } from '../lightbox-panel/lightbox-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        LightboxPanelComponent
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
                OverlayContainer
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
