import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxImgControlComponent } from './lightbox-img-control.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

describe('Create LightboxImgControlComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxImgControlComponent,
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
        const fixture = TestBed.createComponent(LightboxImgControlComponent);
        expect(fixture.componentInstance instanceof LightboxImgControlComponent).toBe(
            true,
            'should create LightboxImgControlComponent'
        );
    });
});
