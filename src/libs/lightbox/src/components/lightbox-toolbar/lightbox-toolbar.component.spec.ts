import { TestBed } from '@angular/core/testing';
import { LightboxToolbarComponent } from './lightbox-toolbar.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

describe('Create LightboxToolbarComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxToolbarComponent,
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
        const fixture = TestBed.createComponent(LightboxToolbarComponent);
        expect(fixture.componentInstance instanceof LightboxToolbarComponent).toBe(
            true,
            'should create LightboxToolbarComponent'
        );
    });
});
