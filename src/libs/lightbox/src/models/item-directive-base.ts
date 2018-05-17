import { LightboxService } from '../services/lightbox.service';
import { ElementRef, Input, OnDestroy } from '@angular/core';
import { Item } from './item';
import { Position } from './position.interface';

export class ItemDirectiveBase {

    @Input('container') protected container: string;

    @Input('src') protected src: string;

    @Input('title') protected title: string;

    @Input('xs-breakpoint') protected xsBreakpoint: number;

    @Input('sm-breakpoint') protected smBreakpoint: number;

    @Input('md-breakpoint') protected mdBreakpoint: number;

    @Input('lg-breakpoint') protected lgBreakpoint: number;

    @Input('xs-src') protected xsSrc: string;

    @Input('sm-src') protected smSrc: string;

    @Input('md-src') protected mdSrc: string;

    @Input('lg-src') protected lgSrc: string;

    @Input('xl-src') protected xlSrc: string;

    protected item: Item;

    protected cursor: 'pointer' | 'default' = 'pointer';

    protected visibility: 'hidden' | 'visible';

    private _loaded: boolean = false;

    constructor(
        protected readonly lightboxService: LightboxService,
        protected readonly elementRef: ElementRef
    ) {}

    protected onClick(event: Event): void {

        if (this._loaded) {

            const position: Position = {
                width: this.elementRef.nativeElement.clientWidth,
                height: this.elementRef.nativeElement.clientHeight,
                offsetTop: Math.round(this.elementRef.nativeElement.getBoundingClientRect().top),
                offsetLeft: Math.round(this.elementRef.nativeElement.getBoundingClientRect().left)
            };
            this.visibility = 'hidden';
            this.lightboxService.openItem(this.item, position);
            this.lightboxService.onClose(() => {

                this.visibility = 'visible';
            });
        }
    }

    protected onLoad(event: Event): void {

        this._loaded = true;
    }

    private _show(): void {

        this.visibility = 'visible';
    }

    private _hide(): void {

        this.visibility = 'hidden';
    }
}
