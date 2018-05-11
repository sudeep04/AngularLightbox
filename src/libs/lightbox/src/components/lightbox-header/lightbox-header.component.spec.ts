import { TestBed } from '@angular/core/testing';
import { LightboxHeaderComponent } from './lightbox-header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

describe('Create LightboxHeaderComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxHeaderComponent,
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
        const fixture = TestBed.createComponent(LightboxHeaderComponent);
        expect(fixture.componentInstance instanceof LightboxHeaderComponent).toBe(
            true,
            'should create LightboxHeaderComponent'
        );
    });
});
