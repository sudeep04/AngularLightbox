import { Directive, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ItemDirectiveBase } from '../models/itemDirectiveBase';
import { LightboxService } from '../services/lightbox.service';
import { Img } from '../models/img';

@Directive({
    selector: 'img[lightbox-img]',
    host: {
        '[style.cursor]': 'cursor',
        '[style.visibility]': 'visibility',
        '(click)': 'onClick($event)',
        '(load)': 'onLoad($event)'
    }
})
export class LightboxImgDirective extends ItemDirectiveBase implements OnInit {

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

        const item = new Img();
        item.title = this.title;
        item.container = this.container;
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
