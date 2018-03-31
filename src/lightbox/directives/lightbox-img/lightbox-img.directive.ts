import { Directive, ElementRef, HostBinding, HostListener, OnInit, Input } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';

@Directive({
    selector: 'img[lightbox-img]'
})
export class LightboxImgDirective implements OnInit {

    @Input() public container: LightboxComponent;

    private _id: number;

    @HostBinding('style.cursor') private _cursor: string;

    constructor(
        private _lightboxService: LightboxService,
        private _element: ElementRef
    ) {}

    public ngOnInit() {

        this._cursor = 'pointer';
        this._id = this._lightboxService.generateId();
        this.container.addItem({ id: this._id, type: 'img' , url: this._element.nativeElement.src});
    }

    @HostListener('click') private _onClick() {

        this.container.openItem(this._id);
        this._hide();
    }

    private _show() {

        this._element.nativeElement.style.visibility = 'show';
    }

    private _hide() {

        this._element.nativeElement.style.visibility = 'hidden';
    }
}
