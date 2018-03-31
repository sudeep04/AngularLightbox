import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Directive({
    selector: 'img[lightbox-img]'
})
export class LightboxImgDirective implements OnInit {

    @HostBinding('style.cursor') private _cursor: string;

    constructor(
        private lightboxService: LightboxService,
        private _element: ElementRef
    ) {}

    public ngOnInit() {

        this._cursor = 'pointer';
    }

    @HostListener('click') private _onClick() {

        this._hide();
    }

    private _show() {

        console.log('image onClick');
    }

    private _hide() {

        this._element.nativeElement.style.visibility = 'hidden';
    }
}
