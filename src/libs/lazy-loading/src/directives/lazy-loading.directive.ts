import { Directive, Input, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { DoomSensorService } from '../services/doom-sensor.service';
import { TrackedProperties } from '../models/tracked-properties.interface';

const XS_BREAKPOINT = 150;
const SM_BREAKPOINT = 300;
const MD_BREAKPOINT = 600;
const LG_BREAKPOINT = 1200;

@Directive({
    selector: 'img[lazy-loading]',
})
export class LazyLoadingDirective implements OnInit, AfterViewInit, OnDestroy {

    @Input('xs-breakpoint') public xsBreakpoint: number;

    @Input('sm-breakpoint') public smBreakpoint: number;

    @Input('md-breakpoint') public mdBreakpoint: number;

    @Input('lg-breakpoint') public lgBreakpoint: number;

    @Input('xs-src') public xsSrc: string;

    @Input('sm-src') public smSrc: string;

    @Input('md-src') public mdSrc: string;

    @Input('lg-src') public lgSrc: string;

    @Input('xl-src') public xlSrc: string;

    @Input('src') public src: string;

    @Input('load') public load: boolean;

    private _currentResolution: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    constructor(
        private readonly _doomSensorService: DoomSensorService,
        private readonly _elementRef: ElementRef
    ) { }

    public ngOnInit(): void {

        if (!this.xsSrc && !this.smSrc && !this.mdSrc && !this.lgSrc && !this.xlSrc && !this.src) {

            throw new Error("At least one of this attributes must be defined 'xs-src | sm-src | md-src | lg-src | xl-src | src'");
        }

        if (!this.xsBreakpoint) {

            this.xsBreakpoint = XS_BREAKPOINT;
        }

        if (!this.smBreakpoint) {

            this.smBreakpoint = SM_BREAKPOINT;
        }

        if (!this.mdBreakpoint) {

            this.mdBreakpoint = MD_BREAKPOINT;
        }

        if (!this.lgBreakpoint) {

            this.lgBreakpoint = LG_BREAKPOINT;
        }

        if (this.src) {

            this._elementRef.nativeElement.src = this.src;
            this._elementRef.nativeElement.style.background = 'url(' + this.src + ')';
        }
    }

    public ngAfterViewInit(): void {

        this._setSrc();

        const trackedProperties: TrackedProperties = {
            width: true,
            height: true,
            top: true,
            left: true
        };

        this._doomSensorService.track(this._elementRef.nativeElement, trackedProperties, () => {

            this._setSrc();
        });
    }

    public ngOnDestroy(): void {

        this._doomSensorService.untrack(this._elementRef.nativeElement);
    }

    private _setSrc(): void {

        if (this._isInViewPort() || this.load) {

            const width = this._elementRef.nativeElement.clientWidth;

            if (this.xlSrc && width > this.lgBreakpoint) {
                if (!this._currentResolution || this._currentResolution !== 'xl') {
                    this._currentResolution = 'xl';
                    this._elementRef.nativeElement.src = this.xlSrc;
                    this._elementRef.nativeElement.style.background = 'url(' + this.xlSrc + ')';
                }
                return;
            }

            if (this.lgSrc && width > this.mdBreakpoint) {
                if (!this._currentResolution || this._currentResolution !== 'lg') {
                    this._currentResolution = 'lg';
                    this._elementRef.nativeElement.src = this.lgSrc;
                    this._elementRef.nativeElement.style.background = 'url(' + this.lgSrc + ')';
                }
                return;
            }

            if (this.mdSrc && width > this.smBreakpoint) {
                if (!this._currentResolution || this._currentResolution !== 'md') {
                    this._currentResolution = 'md';
                    this._elementRef.nativeElement.src = this.mdSrc;
                    this._elementRef.nativeElement.style.background = 'url(' + this.mdSrc + ')';
                }
                return;
            }

            if (this.smSrc && width > this.xsBreakpoint) {
                if (!this._currentResolution || this._currentResolution !== 'sm') {
                    this._currentResolution = 'sm';
                    this._elementRef.nativeElement.src = this.smSrc;
                    this._elementRef.nativeElement.style.background = 'url(' + this.smSrc + ')';
                }
                return;
            }

            if (this.xsSrc) {
                if (!this._currentResolution || this._currentResolution !== 'xs') {
                    this._currentResolution = 'xs';
                    this._elementRef.nativeElement.src = this.xsSrc;
                    this._elementRef.nativeElement.style.background = 'url(' + this.xsSrc + ')';
                }
                return;
            }

            if (this.src) {

                this._elementRef.nativeElement.src = this.src;
                this._elementRef.nativeElement.style.background = 'url(' + this.src + ')';
            } else {

                this._elementRef.nativeElement.src = '';
                this._elementRef.nativeElement.style.background = 'none';
            }
        }
    }

    private _isInViewPort(): boolean {

        const elementTop = Math.round(this._elementRef.nativeElement.getBoundingClientRect().top);
        const elementBottom = elementTop + this._elementRef.nativeElement.clientHeight;
        const elementLeft = Math.round(this._elementRef.nativeElement.getBoundingClientRect().left);
        const elementRight = elementLeft + this._elementRef.nativeElement.clientWidth;

        return (elementLeft <= window.innerWidth && elementRight >= 0 && elementTop <= window.innerHeight && elementBottom >= 0);
    }
}
