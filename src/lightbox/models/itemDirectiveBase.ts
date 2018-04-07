import { IPosition } from './iPosition';
import { LightboxService } from '../services/lightbox.service';
import { ElementRef, Input } from '@angular/core';
import { LightboxComponent } from '../components/lightbox/lightbox.component';

const XS_BREAKPOINT = 576;
const SM_BREAKPOINT = 768;
const MD_BREAKPOINT = 992;
const LG_BREAKPOINT = 1200;

export class ItemDirectiveBase {

    @Input('container') public container: string;
    
    @Input('src') public src: string;

    @Input('title') public title: string;

    @Input('xs-breakpoint') public xsBreakpoint: number = XS_BREAKPOINT;

    @Input('sm-breakpoint') public smBreakpoint: number = SM_BREAKPOINT;

    @Input('md-breakpoint') public mdBreakpoint: number = MD_BREAKPOINT;

    @Input('lg-breakpoint') public lgBreakpoint: number = LG_BREAKPOINT;

    @Input('xs-src') public xsSrc: string;

    @Input('sm-src') public smSrc: string;

    @Input('md-src') public mdSrc: string;

    @Input('lg-src') public lgSrc: string;

    @Input('xl-src') public xlSrc: string;

    protected cursor: 'pointer' | 'default' = 'pointer';

    protected visibility: 'hidden' | 'visible';

    private _loaded: boolean = false;

    private _show() {

        this.visibility = 'visible';
    }

    private _hide() {

        this.visibility = 'hidden';
    }

    protected onClick(event: Event) {

        if(this._loaded) {

        }
    }

    protected onLoad(event: Event) {

        this._loaded = true;
    }
}