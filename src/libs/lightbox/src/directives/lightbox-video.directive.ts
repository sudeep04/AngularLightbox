import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { ItemDirectiveBase } from '../models/item-directive-base';
import { LightboxService } from '../services/lightbox.service';
import { Video } from '../models/video';

@Directive({
    selector: 'img[lightbox-video]',
    host: {
        '[style.cursor]': 'cursor',
        '[style.visibility]': 'visibility',
        '(click)': 'onClick($event)',
        '(load)': 'onLoad($event)'
    }
})
export class LightboxVideoDirective extends ItemDirectiveBase implements OnInit, OnDestroy {

    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }
    @Input('youtube-id') public youtubeId: string;

    constructor(
        private readonly _lightboxService: LightboxService,
        private readonly _elementRef: ElementRef
    ) {
        super(_lightboxService, _elementRef);
    }

    public ngOnInit(): void {

        if (!this.container) {
            throw new Error("Attribute 'lightbox-container' is required");
        }

        if (!this.title) {
            throw new Error("Attribute 'lightbox-title' is required");
        }

        if (!this.youtubeId) {
            throw new Error("Attribute 'youtube-id' is required");
        }

        const item = new Video();
        item.title = this.title;
        item.container = this.container;
        item.youtubeVieoId = this.youtubeId;
        item.src = this.src;
        item.xsSrc = this.xsSrc;
        item.smSrc = this.smSrc;
        item.mdSrc = this.mdSrc;
        item.lgSrc = this.lgSrc;
        item.xlSrc = this.xlSrc;
        item.xsBreakpoint = this.xsBreakpoint;
        item.smBreakpoint = this.smBreakpoint;
        item.mdBreakpoint = this.mdBreakpoint;
        item.lgBreakpoint = this.mdBreakpoint;
        this.item = item;

        this._lightboxService.addItem(this.item);
    }
}
