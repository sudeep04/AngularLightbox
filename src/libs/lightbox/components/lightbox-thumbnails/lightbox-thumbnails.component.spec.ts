import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxThumbnailsComponent } from './lightbox-thumbnails.component';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

describe('Create LightboxThumbnailsComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LightboxThumbnailsComponent],
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
        const fixture = TestBed.createComponent(LightboxThumbnailsComponent);
        expect(fixture.componentInstance instanceof LightboxThumbnailsComponent).toBe(
            true,
            'should create LightboxThumbnailsComponent'
        );
    });
});
