import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxZoomComponent } from './lightbox-zoom.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

describe('Create LightboxZoomComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxZoomComponent,
                LightboxButtonComponent
            ],
            imports: [
                CommonModule,
                BrowserAnimationsModule
            ],
            providers: [
                LightboxConfigurationService
            ]
        });
    });

    it('should work', () => {
        const fixture = TestBed.createComponent(LightboxZoomComponent);
        expect(fixture.componentInstance instanceof LightboxZoomComponent).toBe(
            true,
            'should create LightboxZoomComponent'
        );
    });
});
