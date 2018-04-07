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
export class LightboxImgDirective extends ItemDirectiveBase implements OnInit, OnDestroy {

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

        this.item = <Img>{
            title: this.title,
            src: this.src,
            xsSrc: this.xsSrc,
            smSrc: this.smSrc,
            mdSrc: this.mdSrc,
            lgSrc: this.lgSrc,
            xlSrc: this.xlSrc,
            xsBreakpoint: this.xsBreakpoint,
            smBreakpoint: this.smBreakpoint,
            mdBreakpoint: this.mdBreakpoint,
            lgBreakpoint: this.mdBreakpoint
        }

        this._lightboxService.addItem(this.item, this.container);
    }
}
