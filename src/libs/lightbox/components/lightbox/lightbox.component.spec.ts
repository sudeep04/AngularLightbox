import { TestBed } from '@angular/core/testing';
import { LightboxComponent } from './lightbox.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightboxHeaderComponent } from '../lightbox-header/lightbox-header.component';
import { LightboxItemComponent } from '../ligthbox-item/lightbox-item.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { LazyLoadingModule } from 'lazy-loading/lazy-loading.module';
import { LightboxImgDirective } from '../../directives/lightbox-img.directive';
import { LightboxVideoDirective } from '../../directives/lightbox-video.directive';

describe('Create LightboxComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxComponent,
                LightboxHeaderComponent,
                LightboxItemComponent,
                LightboxButtonComponent,
                LightboxImgDirective,
                LightboxVideoDirective
            ],
            imports: [
                CommonModule,
                BrowserAnimationsModule,
                LazyLoadingModule
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
