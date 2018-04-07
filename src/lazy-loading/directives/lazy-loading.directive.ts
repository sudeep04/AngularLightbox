import { Directive, Input, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { IBreakpoints } from '../models/iBreakpoints';
import { DoomSensorService } from '../services/doomSensor.service';
import { ITrackedProperties } from '../models/iTrackedProperties';

const XS_BREAKPOINT = 576;
const SM_BREAKPOINT = 768;
const MD_BREAKPOINT = 992;
const LG_BREAKPOINT = 1200;

@Directive({
    selector: 'img[lazy-loading]',
})
export class LazyLoadingDirective implements OnInit, AfterViewInit, OnDestroy{

    @Input('xs-breakpoint') public xsBreakpoint: number = XS_BREAKPOINT;

    @Input('sm-breakpoint') public smBreakpoint: number = SM_BREAKPOINT;

    @Input('md-breakpoint') public mdBreakpoint: number = MD_BREAKPOINT;

    @Input('lg-breakpoint') public lgBreakpoint: number = LG_BREAKPOINT;

    @Input('xs-src') public xsSrc: string;

    @Input('sm-src') public smSrc: string;

    @Input('md-src') public mdSrc: string;

    @Input('lg-src') public lgSrc: string;

    @Input('xl-src') public xlSrc: string;

    @Input('load') public load: boolean;

    private _currentResolution: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

    constructor(
        private readonly _doomSensorService: DoomSensorService,
        private readonly _elementRef: ElementRef
    ) {}

    public ngOnInit(): void {
        
        if(!this.xsSrc && !this.smSrc && !this.mdSrc && !this.lgSrc && !this.xlSrc) {

            throw new Error("One of this attributes are required 'xs-src | sm-src | md-src | lg-src | xl-src'");
        }
    }

    public ngAfterViewInit(): void {

        this._setSrc();
        
        const trackedProperties: ITrackedProperties = {
            width: true,
            height: true,
            top: true,
            left: true
        }

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
                if (!this._currentResolution || this._currentResolution != 'xl') {
                    this._currentResolution = 'xl';
                    this._elementRef.nativeElement.src = this.xlSrc;
                }
                return;
            }

            if (this.lgSrc && width > this.mdBreakpoint) {
                if (!this._currentResolution || this._currentResolution != 'lg') {
                    this._currentResolution = 'lg';
                    this._elementRef.nativeElement.src = this.lgSrc;
                }
                return;
            }

            if (this.mdSrc && width > this.smBreakpoint) {
                if (!this._currentResolution || this._currentResolution != 'md') {
                    this._currentResolution = 'md';
                    this._elementRef.nativeElement.src = this.mdSrc;
                }
                return;
            }

            if (this.smSrc && width > this.xsBreakpoint) {
                if (!this._currentResolution || this._currentResolution != 'sm') {
                    this._currentResolution = 'sm';
                    this._elementRef.nativeElement.src = this.smSrc;
                }
                return;
            }

            if (this.xsSrc) {
                if (!this._currentResolution || this._currentResolution != 'xs') {
                    this._currentResolution = 'xs';
                    this._elementRef.nativeElement.src = this.xsSrc;
                }
                return;
            }
            
            this._elementRef.nativeElement.src = '';
        }
    }

    private _isInViewPort(): boolean {

        const elementTop = Math.round(this._elementRef.nativeElement.getBoundingClientRect().top);
        const elementLeft = Math.round(this._elementRef.nativeElement.getBoundingClientRect().left);

        return (elementTop >= 0 && elementTop < window.innerHeight && elementLeft >= 0 && elementLeft < window.innerWidth)
    }
}
