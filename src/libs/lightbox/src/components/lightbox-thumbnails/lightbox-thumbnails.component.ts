import { Component, Output, EventEmitter, Input, ViewChildren, QueryList, ElementRef, ViewChild, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { ThumbnailsAnimation } from '../../models/thumbnails-animation.interface';
import { ThumbnailsSliceAnimation } from '../../models/thumbnails-slice-animation.interface';
import { Item } from '../../models/item';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

@Component({
    selector: 'lightbox-thumbnails',
    templateUrl: 'lightbox-thumbnails.component.html',
    styleUrls: ['lightbox-thumbnails.component.scss'],
    animations: [
        trigger('thumbnailsAnimation', [
            state('hidden',
                style({ maxWidth: '0px' })),
            state('visible',
                style({ maxWidth: '170px' })),
            transition('hidden => visible', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } }),
            transition('visible => hidden', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ]),
        trigger('thumbnailsSliceAnimation', [
            state('slice',
                style({ top: '{{top}}px' }),
                { params: { top: 0 } }),
            state('slicing',
                style({ top: '{{top}}px' }),
                { params: { top: 0 } }),
            state('sliced',
                style({ top: '{{top}}px' }),
                { params: { top: 0 } }),
            transition('* => slicing', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ])
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

    private _scrolling = false;

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService
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

        this.thumbnailsSliceAnimation = { value: 'sliced' };
        this.thumbnailsAnimation = { value: 'hidden', params: { duration: this.config.animations.thumbnailsHide.duration } };
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

        if (event.toState === 'visible' && this.activeItem) {

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

        if (!this.config.controls.thumbnails.disable) {

            this.thumbnailsAnimation = { value: 'hidden', params: { duration: this.config.animations.thumbnailsHide.duration } };
        }
    }

    public open(): void {

        if (!this.config.controls.thumbnails.disable) {

            this.thumbnailsAnimation = { value: 'visible', params: { duration: this.config.animations.thumbnailsShow.duration } };
        }
    }

    public toggle(): void {

        if (!this.config.controls.thumbnails.disable) {

            if (this.thumbnailsAnimation.value === 'hidden') {

                this.thumbnailsAnimation = { value: 'visible', params: { duration: this.config.animations.thumbnailsShow.duration } };
            } else {

                this.thumbnailsAnimation = { value: 'hidden', params: { duration: this.config.animations.thumbnailsHide.duration } };
            }
        }
    }

    public resize(): void {

        if (this.thumbnailsAnimation.value === 'visible' && !this._scrolling) {

            this._animateSlice();
        }
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

    private _animateSlice(): void {

        this.thumbnailsSliceAnimation = {
            value: 'slice', params: {
                top: this._listRef.nativeElement.offsetTop - 12,
                duration: this.config.animations.thumbnailsSlice.duration
            }
        };
    }

    private _animateSliced(): void {

        this.thumbnailsSliceAnimation = {
            value: 'sliced', params: {
                top: this._listRef.nativeElement.offsetTop - 12,
                duration: this.config.animations.thumbnailsSlice.duration
            }
        };
    }

    private _animateSlicing(): void {

        const activeItemRef = this._itemsRef.toArray()[this.items.indexOf(this.activeItem)];

        if (activeItemRef) {

            let top = Math.round(((this._containerRef.nativeElement.clientHeight - activeItemRef.nativeElement.clientHeight) / 2) - activeItemRef.nativeElement.offsetTop);

            if (top < (this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight)) {

                top = this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight;
            }

            if (top > 0) {

                top = 0;
            }

            this.thumbnailsSliceAnimation = {
                value: 'slicing', params: {
                    top,
                    duration: this.config.animations.thumbnailsSlice.duration
                }
            };
        }
    }
}
