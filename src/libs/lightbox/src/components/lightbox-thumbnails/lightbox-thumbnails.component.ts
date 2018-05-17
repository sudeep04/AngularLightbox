import { Component, Output, EventEmitter, Input, ViewChildren, QueryList, ElementRef, ViewChild, OnInit, Inject, InjectionToken } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { ThumbnailsAnimation } from '../../models/thumbnails-animation.interface';
import { ThumbnailsSliceAnimation } from '../../models/thumbnails-slice-animation.interface';
import { Item } from '../../models/item';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

export const WINDOW = new InjectionToken('Window');
export function _window() { return window; }

const SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };

@Component({
    selector: 'lightbox-thumbnails',
    templateUrl: 'lightbox-thumbnails.component.html',
    styleUrls: ['lightbox-thumbnails.component.scss'],
    animations: [
        trigger('thumbnailsAnimation', [
            state('animating',
                style({ maxWidth: '{{maxWidth}}px', maxHeight: '{{maxHeight}}px' }),
                { params: { maxWidth: 0, maxHeight: 0 } }),
            state('animated',
                style({ maxWidth: '{{maxWidth}}px', maxHeight: '{{maxHeight}}px' }),
                { params: { maxWidth: 0, maxHeight: 0  } }),
            transition('* => animating', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ]),
        trigger('thumbnailsSliceAnimation', [
            state('slice',
                style({ top: '{{top}}px', left: '{{left}}px' }),
                { params: { top: 0, left: 0 } }),
            state('slicing',
                style({ top: '{{top}}px', left: '{{left}}px' }),
                { params: { top: 0, left: 0 } }),
            state('sliced',
                style({ top: '{{top}}px', left: '{{left}}px' }),
                { params: { top: 0, left: 0 } }),
            transition('* => slicing', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ])
    ],
    providers: [
        { provide: WINDOW, useFactory: _window }
    ],
    host: {
        '[@thumbnailsAnimation]': 'thumbnailsAnimation',
        '(@thumbnailsAnimation.done)': 'thumbnailsAnimationDone($event)'
    }
})
export class LightboxThumbnailsComponent implements OnInit {

    public thumbnailsAnimation: ThumbnailsAnimation;

    public thumbnailsSliceAnimation: ThumbnailsSliceAnimation;

    public activeItem: Item;

    @Input('items') public items: Item[] = [];

    @Output() public selectEvent = new EventEmitter();

    @ViewChildren('thumnail') private _itemsRef: QueryList<ElementRef>;

    @ViewChild('thumnailsList') private _listRef: ElementRef;

    @ViewChild('thumnailsContainer') private _containerRef: ElementRef;

    private _thickness: number;

    public thumbnailsWidth: string;

    public thumbnailsHeight: string;

    private _state: 'opened' | 'closed' = 'closed';

    private _scrolling = false;

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService,
        @Inject(WINDOW) private readonly _window: Window
    ) { }

    public onwheel(event: any): void {

        this._scrolling = true;
        let top = this._listRef.nativeElement.offsetTop - 12;

        if (event.deltaY < 0) {

            top += 50;
        } else {

            top -= 50;
        }

        if (top < (this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight)) {

            top = this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight;
        }

        if (top > 0) {

            top = 0;
        }

        this._listRef.nativeElement.style.top = top + 'px';
    }

    public ngOnInit(): void {
        if (this._window.innerWidth <= 767) {

            this._thickness = 85;
        } else {

            this._thickness = 170;
        }
        this.thumbnailsSliceAnimation = { value: 'sliced' };
        this._animatePanel();
    }

    public thumbnailsSliceAnimationDone(event: AnimationEvent): void {

        switch (event.toState) {
            case 'slice':
                this._animateSlicing();
                break;
            case 'slicing':
                this._animateSliced();
                break;
        }
    }

    public thumbnailsAnimationDone(event: AnimationEvent): void {

        if (event.toState === 'animating') {
            this.thumbnailsAnimation = { value: 'animated', params: this.thumbnailsAnimation.params }
        }

        if (this.activeItem && this._state == 'opened') {

            this._animateSlice();
        }
    }

    public selectItem(item: Item): void {

        if (!this.config.controls.thumbnails.disable) {

            this._scrolling = false;
            this.activeItem = item;
            this._animateSlice();
        }
    }

    public onSelect(item: Item): void {

        if (item !== this.activeItem) {
            this.selectEvent.emit(item);
        }
    }

    public close(): void {

        if (!this.config.controls.thumbnails.disable && this._state !== 'closed') {

            this._state = 'closed';
            this._animatePanel();
        }
    }

    public open(): void {

        if (!this.config.controls.thumbnails.disable && this._state !== 'opened') {

            this._state = 'opened';
            this._animatePanel();
        }
    }

    public toggle(): void {

        if (!this.config.controls.thumbnails.disable) {

            if (this._state === 'opened') {

                this._state = 'closed';
                this._animatePanel();
            } else {

                this._state = 'opened';
                this._animatePanel();
            }
        }
    }

    public resize(): void {

        if (this._window.innerWidth <= 767 && this._thickness != 80) {

            this._thickness = 80;
            this._animatePanel();
        }
        if (this._window.innerWidth <= 1023 && this._thickness != 120) {

            this._thickness = 120;
            this._animatePanel();
        }
        if (this._window.innerWidth > 1023 && this._thickness != 170) {

            this._thickness = 170;
            this._animatePanel();
        }
        if (this.thumbnailsAnimation.params.maxWidth > 0 && !this._scrolling) {

            this._animateSlice();
        }
    }

    public swipe(action: string) {
        
        console.log(action);
    }

    public getItemSrc(item: Item): string {

        if (item.src) { return item.src; }
        if (item.xsSrc) { return item.xsSrc; }
        if (item.smSrc) { return item.smSrc; }
        if (item.mdSrc) { return item.mdSrc; }
        if (item.lgSrc) { return item.lgSrc; }
        if (item.xlSrc) { return item.xlSrc; }

        return '';
    }

    private _animatePanel() {
        if (this.config.controls.thumbnails.position === 'left' || this.config.controls.thumbnails.position === 'right') {
            if (this._state == 'opened') {
                this.thumbnailsWidth = this._thickness + 'px';
                this.thumbnailsHeight = 'auto';
                this.thumbnailsAnimation = { value: 'animating', params: { duration: this.config.animations.thumbnailsShow.duration, maxWidth: this._thickness, maxHeight: 10000 } };
            } else {
                this.thumbnailsAnimation = { value: 'animating', params: { duration: this.config.animations.thumbnailsHide.duration, maxWidth: 0, maxHeight: 10000 } };
            }
        } else {
            if (this._state == 'opened') {
                this.thumbnailsWidth = 'auto';
                this.thumbnailsHeight = this._thickness + 'px';
                this.thumbnailsAnimation = { value: 'animating', params: { duration: this.config.animations.thumbnailsShow.duration, maxHeight: this._thickness, maxWidth: 10000 } };
            } else {
                this.thumbnailsAnimation = { value: 'animating', params: { duration: this.config.animations.thumbnailsHide.duration, maxHeight: 0, maxWidth: 10000 } };
            }
        }
    }

    private _animateSlice(): void {
        if (this.config.controls.thumbnails.position === 'left' || this.config.controls.thumbnails.position === 'right') {
            this.thumbnailsSliceAnimation = {
                value: 'slice', params: {
                    top: this._listRef.nativeElement.offsetTop - 12,
                    left:0,
                    duration: this.config.animations.thumbnailsSlice.duration
                }
            };
        } else {
            this.thumbnailsSliceAnimation = {
                value: 'slice', params: {
                    top: 0,
                    left: this._listRef.nativeElement.offsetLeft - 12,
                    duration: this.config.animations.thumbnailsSlice.duration
                }
            };
        }
    }

    private _animateSliced(): void {

        if (this.config.controls.thumbnails.position === 'left' || this.config.controls.thumbnails.position === 'right') {
            
        this.thumbnailsSliceAnimation = {
            value: 'sliced', params: {
                top: this._listRef.nativeElement.offsetTop - 12,
                left: 0,
                duration: this.config.animations.thumbnailsSlice.duration
            }
        };
        } else {
            
            this.thumbnailsSliceAnimation = {
                value: 'sliced', params: {
                    top: 0,
                    left: this._listRef.nativeElement.offsetLeft - 12,
                    duration: this.config.animations.thumbnailsSlice.duration
                }
            };
        }
    }

    private _animateSlicing(): void {

        const activeItemRef = this._itemsRef.toArray()[this.items.indexOf(this.activeItem)];

        if (activeItemRef  && (this.config.controls.thumbnails.position === 'left' || this.config.controls.thumbnails.position === 'right')) {

            let top = Math.round(((this._containerRef.nativeElement.clientHeight - activeItemRef.nativeElement.clientHeight) / 2) - activeItemRef.nativeElement.offsetTop);

            if (top < (this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight + 12)) {

                top = this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight + 12;
            }

            if (top > 0) {

                top = 0;
            }

            this.thumbnailsSliceAnimation = {
                value: 'slicing', params: {
                    top,
                    left: 0,
                    duration: this.config.animations.thumbnailsSlice.duration
                }
            };
        }

        if (activeItemRef  && (this.config.controls.thumbnails.position === 'top' || this.config.controls.thumbnails.position === 'bottom')) {

            let left = Math.round(((this._containerRef.nativeElement.clientWidth - activeItemRef.nativeElement.clientWidth) / 2) - activeItemRef.nativeElement.offsetLeft);

            if (left < (this._containerRef.nativeElement.clientWidth - this._listRef.nativeElement.clientWidth + 12)) {

                left = this._containerRef.nativeElement.clientWidth - this._listRef.nativeElement.clientWidth + 12;
            }

            if (left > 0) {

                left = 0;
            }

            this.thumbnailsSliceAnimation = {
                value: 'slicing', params: {
                    top: 0,
                    left,
                    duration: this.config.animations.thumbnailsSlice.duration
                }
            };
        }
    }
}
