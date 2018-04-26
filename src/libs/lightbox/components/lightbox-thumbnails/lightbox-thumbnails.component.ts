import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
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
        trigger('sliceAnimator', [
            state('up',
                style({ top: '{{top}}px' }),
                { params: { top: 0 } }),
            state('down',
                style({ top: '{{top}}px' }),
                { params: { top: 0 } }),
            transition('up => down', [
                animate('.4s')
            ]),
            transition('down => up', [
                animate('.4s')
            ]),
        ])
    ],
    host: {
        '[@visibilityAnimator]': 'visibilityAnimator'
    }
})
export class LightboxThumbnailsComponent {

    public visibilityAnimator: ThumbnailVisibilityAnimatorState = { value: 'hidden' };

    public sliceAnimator: ThumbnailSliceAnimatorState = { value: 'up' };

    @Input('items') public items: Item[] = [];
    
    @Output() public selectEvent = new EventEmitter();
    
    public activeItem: Item;

    public selectItem(item: Item): void {

        this.activeItem = item;
    }

    public onSelect(item:Item): void {

        if(item!= this.activeItem) {
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

            this.visibilityAnimator = { value: 'visible', params: { maxWidth: this._getMaxWidth } };
        }
    }

    public getItemSrc(item: Item): string {
        if (item.src) return item.src;
        if (item.xsSrc) return item.xsSrc;
        if (item.smSrc) return item.smSrc;
        if (item.mdSrc) return item.mdSrc;
        if (item.lgSrc) return item.lgSrc;
        if (item.xlSrc) return item.xlSrc;
    }

    private get _getMaxWidth(): number {
        let maxWidth = 0;
        if (window.innerWidth > 767) {
            maxWidth = 170;
        }
        return maxWidth;
    }
}
