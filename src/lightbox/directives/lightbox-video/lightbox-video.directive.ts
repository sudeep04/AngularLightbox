import { Directive, OnInit, Input, ElementRef } from '@angular/core';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { LightboxService } from '../../services/lightbox.service';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
    selector: 'img[lightbox-video]',
    host: {
        '[style.cursor]': '_cursor',
        '(click)': '_onClick($event)'
    }
})
export class LightboxVideoDirective implements OnInit {

    @Input('lightbox-container') public container: LightboxComponent;

    @Input('lightbox-title') public title: string;

    @Input('lightbox-video-url') public videoUrl: string;

    private _id: number;

    private _cursor: string;

    constructor(
        private _lightboxService: LightboxService,
        private _element: ElementRef,
        private _domSanitizationService: DomSanitizer
    ) { }

    public ngOnInit() {

        if (this.container == null) {
            throw new Error("Attribute 'lightbox-container' is required");
        }

        if (this.title == null) {
            throw new Error("Attribute 'lightbox-title' is required");
        }

        if (this.videoUrl == null) {
            throw new Error("Attribute 'lightbox-video-url' is required");
        }
        this._cursor = 'pointer';
        this._id = this._lightboxService.generateId();
        this.container.addItem({
            id: this._id,
            title: this.title,
            videoUrl: this._domSanitizationService.bypassSecurityTrustResourceUrl(this.videoUrl),
            type: 'video',
            url: this._element.nativeElement.src,
            original: {
                width: this._element.nativeElement.naturalWidth,
                height: this._element.nativeElement.naturalHeight,
                offsetTop: Math.round(this._element.nativeElement.getBoundingClientRect().top),
                offsetLeft: Math.round(this._element.nativeElement.getBoundingClientRect().left)
            }
        });
    }

    private _onClick(event: Event) {

        this.container.updateItem(
            this._id,
            this._element.nativeElement.clientWidth,
            this._element.nativeElement.clientHeight,
            Math.round(this._element.nativeElement.getBoundingClientRect().top),
            Math.round(this._element.nativeElement.getBoundingClientRect().left)
        );
        this.container.openItem(this._id);
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
