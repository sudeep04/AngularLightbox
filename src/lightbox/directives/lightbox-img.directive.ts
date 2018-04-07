import { Directive, OnInit, OnDestroy } from '@angular/core';
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
        private _lightboxService: LightboxService
    ) {
        super();
    }

    public ngOnInit() {

        if (!this.container) {
            throw new Error("Attribute 'lightbox-container' is required");
        }

        if (!this.title) {
            throw new Error("Attribute 'lightbox-title' is required");
        }

        const img: Img = {
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

        this._lightboxService.addItem(img, this.container);
    }

    public ngOnDestroy(): void {


    }
}
