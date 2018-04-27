import { TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxHeaderComponent } from '../lightbox-header/lightbox-header.component';
import { LightboxItemComponent } from '../ligthbox-item/lightbox-item.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LazyLoadingModule } from 'libs/lazy-loading/lazy-loading.module';
import { LightboxImgDirective } from '../../directives/lightbox-img.directive';
import { LightboxVideoDirective } from '../../directives/lightbox-video.directive';
import { YoutubeModule } from '../../../youtube/youtube.module';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';
import { LightboxImgControlComponent } from '../lightbox-img-control/lightbox-img-control.component';
import { LightboxThumbnailsComponent } from '../lightbox-thumbnails/lightbox-thumbnails.component';

describe('Create LightboxComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxComponent,
                LightboxHeaderComponent,
                LightboxItemComponent,
                LightboxButtonComponent,
                LightboxImgDirective,
                LightboxVideoDirective,
                LightboxImgControlComponent,
                LightboxThumbnailsComponent
            ],
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                LazyLoadingModule,
                YoutubeModule
            ],
            providers: [
                LightboxConfigurationService
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
