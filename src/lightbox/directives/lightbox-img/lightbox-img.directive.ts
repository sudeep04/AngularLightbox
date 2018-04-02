import { Directive, ElementRef, HostBinding, HostListener, OnInit, Input } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/distinctUntilChanged';

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
    ) { }

    public ngOnInit() {

        if (this.container == null) {
            throw new Error("Attribute 'lightbox-container' is required");
        }

        if (this.title == null) {
            throw new Error("Attribute 'lightbox-title' is required");
        }

        this._cursor = 'pointer';
        this._id = this._lightboxService.generateId();
        this.container.addItem({
            id: this._id,
            title: this.title,
            type: 'img',
            url: this._element.nativeElement.src,
            originalWidth: this._element.nativeElement.naturalWidth,
            originalHeight: this._element.nativeElement.naturalHeight
        });
    }

    private _onClick(event: Event) {

        this.container.openItem(
            this._id,
            this._element.nativeElement.clientWidth,
            this._element.nativeElement.clientHeight,
            Math.round(this._element.nativeElement.getBoundingClientRect().top),
            Math.round(this._element.nativeElement.getBoundingClientRect().left)
        );
        this._hide();
        const panelStateSubscription = this._lightboxService.panel.$state.distinctUntilChanged().skip(1).subscribe((state) => {
            if (state === 'closed') {
                this._show();
                panelStateSubscription.unsubscribe();
            }
        });
    }

    private _show() {

        this._element.nativeElement.style.visibility = 'visible';
    }

    private _hide() {

        this._element.nativeElement.style.visibility = 'hidden';
    }
}
