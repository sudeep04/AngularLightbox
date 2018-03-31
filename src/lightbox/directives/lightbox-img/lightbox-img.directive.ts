import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Directive({
    selector: 'img[lightbox-img]'
})
export class LightboxImgDirective implements OnInit {

    private _id: number;
    @HostBinding('style.cursor') private _cursor: string;

    constructor(
        private lightboxService: LightboxService,
        private _element: ElementRef
    ) {}

    public ngOnInit() {

        this._cursor = 'pointer';
        this._id = this.lightboxService.generateId();
        this.lightboxService.addImage(this._id, this._element.nativeElement.src);
    }

    @HostListener('click') private _onClick() {

        this._hide();
    }

    private _show() {

        this._element.nativeElement.style.visibility = 'show';
    }

    private _hide() {

        this._element.nativeElement.style.visibility = 'hidden';
    }
}
