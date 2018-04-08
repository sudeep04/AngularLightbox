import { Directive, OnInit, OnDestroy, ElementRef, Input } from '@angular/core';
import { ItemDirectiveBase } from '../models/itemDirectiveBase';
import { LightboxService } from '../services/lightbox.service';
import { Video } from '../models/video';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
    selector: 'img[lightbox-img]',
    host: {
        '[style.cursor]': 'cursor',
        '[style.visibility]': 'visibility',
        '(click)': 'onClick($event)',
        '(load)': 'onLoad($event)'
    }
})
export class LightboxVideoDirective extends ItemDirectiveBase implements OnInit, OnDestroy {

    constructor(
        private readonly _lightboxService: LightboxService,
        private readonly _elementRef: ElementRef,
        private _domSanitizationService: DomSanitizer
    ) {
        super(_lightboxService, _elementRef);
    }
    
    @Input('youtube-id') public youtubeId: string;

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

        this.item = <Video>{
            title: this.title,
            container: this.container,
            youtubeVieoUrl: this._domSanitizationService.bypassSecurityTrustResourceUrl(this.youtubeId),
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

        this._lightboxService.addItem(this.item);
    }
}

