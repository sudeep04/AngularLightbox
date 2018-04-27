import { Component, Output, EventEmitter, Input, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { ThumbnailVisibilityAnimatorState } from '../../models/thumbnail-visibility-animator-state.interface';
import { Item } from '../../models/item';
import { ThumbnailSliceAnimatorState } from '../../models/thumbnail-slice-animator-state.interface';

@Component({
    selector: 'lightbox-thumbnails',
    templateUrl: './lightbox-thumbnails.component.html',
    styleUrls: ['./lightbox-thumbnails.component.scss'],
    animations: [
        trigger('visibilityAnimator', [
            state('hidden',
                style({ maxWidth: '0px' })),
            state('visible',
                style({ maxWidth: '{{maxWidth}}px' }),
                { params: { maxWidth: 0 } }),
            transition('hidden => visible', [
                animate('.4s')
            ]),
            transition('visible => hidden', [
                animate('.05s')
            ]),
        ]),
        trigger('sliceAnimatorState', [
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
                animate('.4s')
            ])
        ])
    ],
    host: {
        '[@visibilityAnimator]': 'visibilityAnimator',
        '(@visibilityAnimator.done)': 'visibilityAnimatorDone($event)'
    }
})
export class LightboxThumbnailsComponent {

    public visibilityAnimator: ThumbnailVisibilityAnimatorState = { value: 'hidden' };

    public sliceAnimator: ThumbnailSliceAnimatorState = { value: 'sliced' };

    public activeItem: Item;

    @Input('items') public items: Item[] = [];

    @Output() public selectEvent = new EventEmitter();

    @ViewChildren('thumnail') private _itemsRef: QueryList<ElementRef>;

    @ViewChild('thumnailsList') private _listRef: ElementRef;

    @ViewChild('thumnailsContainer') private _containerRef: ElementRef;

    public sliceAnimatorDone(event: AnimationEvent): void {

        switch (event.toState) {
            case 'slice':
                this._animateSlicing();
                break;
            case 'slicing':
                this._animateSliced();
                break;
        }
    }

    public visibilityAnimatorDone(event: AnimationEvent): void {

        if (event.toState == 'visible' && this.activeItem) {
            
            this._animateSlice();
        }
    }

    public selectItem(item: Item): void {

        this.activeItem = item;
        this._animateSlice();
    }

    public onSelect(item: Item): void {

        if (item !== this.activeItem) {
            this.selectEvent.emit(item);
        }
    }

    public close(): void {

        this.visibilityAnimator = { value: 'hidden' };
    }

    public open(): void {

        this.visibilityAnimator = { value: 'visible', params: { maxWidth: this._getMaxWidth } };
    }

    public toggle(): void {

        if (this.visibilityAnimator.value === 'hidden') {

            this.visibilityAnimator = { value: 'visible', params: { maxWidth: this._getMaxWidth } };
        } else {

            this.visibilityAnimator = { value: 'hidden' };
        }
    }

    public resize(): void {

        if (this.visibilityAnimator.value === 'visible') {

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
    }

    private get _getMaxWidth(): number {

        let maxWidth = 0;
        if (window.innerWidth > 767) {
            maxWidth = 170;
        }
        return maxWidth;
    }

    private _animateSlice(): void {

        this.sliceAnimator = { value: 'slice', params: { top: this._listRef.nativeElement.offsetTop - 12 } };
    }

    private _animateSliced(): void {

        this.sliceAnimator = { value: 'sliced', params: { top: this._listRef.nativeElement.offsetTop - 12 } };
    }

    private _animateSlicing(): void {

        const activeItemRef = this._itemsRef.toArray()[this.items.indexOf(this.activeItem)];
        let top = Math.round(((this._containerRef.nativeElement.clientHeight - activeItemRef.nativeElement.clientHeight) / 2) - activeItemRef.nativeElement.offsetTop);

        if (top > 0) {

            top = 0;
        }

        if (top < (this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight)) {

            top = this._containerRef.nativeElement.clientHeight - this._listRef.nativeElement.clientHeight;
        }

        this.sliceAnimator = { value: 'slicing', params: { top } };
    }
}
