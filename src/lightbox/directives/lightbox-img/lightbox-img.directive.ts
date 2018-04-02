import { Directive, ElementRef, HostBinding, HostListener, OnInit, Input } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';

@Directive({
    selector: 'img[lightbox-img]',
    host: {
        '[style.cursor]': '_cursor',
        '(click)': '_onClick($event)'
    }
})
export class LightboxImgDirective implements OnInit {

    @Input('lightbox-container') public container: LightboxComponent;

    @Input('lightbox-title') public title: string;

    private _id: number;

    private _cursor: string;

    constructor(
        private _lightboxService: LightboxService,
        private _element: ElementRef
    ) {}

    public ngOnInit() {

        if(this.container == null) { 
            throw new Error("Attribute 'lightbox-container' is required");
        }

        if(this.title == null) { 
            throw new Error("Attribute 'lightbox-title' is required");
        }

        this._cursor = 'pointer';
        this._id = this._lightboxService.generateId();
        this.container.addItem({ id: this._id, title: this.title, type: 'img' , url: this._element.nativeElement.src});

        console.log('w: ' + this._element.nativeElement.naturalWidth + ', h: ' + this._element.nativeElement.naturalHeight);
        console.log('w: ' + this._element.nativeElement.clientWidth + ', h: ' + this._element.nativeElement.clientHeight);
    }

    private _onClick(event: Event) {

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
