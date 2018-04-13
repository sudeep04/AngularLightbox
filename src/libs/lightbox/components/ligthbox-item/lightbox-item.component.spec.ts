import { TestBed } from '@angular/core/testing';
import { LightboxItemComponent } from './lightbox-item.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadingModule } from 'lazy-loading/lazy-loading.module';
import { LightboxImgDirective } from '../../directives/lightbox-img.directive';
import { LightboxVideoDirective } from '../../directives/lightbox-video.directive';

describe('Create LightboxItemComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                LightboxItemComponent,
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
        const fixture = TestBed.createComponent(LightboxItemComponent);
        expect(fixture.componentInstance instanceof LightboxItemComponent).toBe(
            true,
            'should create LightboxItemComponent'
        );
    });
});
