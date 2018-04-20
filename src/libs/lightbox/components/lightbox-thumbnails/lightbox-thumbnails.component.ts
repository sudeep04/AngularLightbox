import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ThumbnailAnimatorState } from '../../models/thumbnail-animator-state.interface';
import { Item } from '../../models/item';

@Component({
    selector: 'lightbox-thumbnails',
    templateUrl: './lightbox-thumbnails.component.html',
    styleUrls: ['./lightbox-thumbnails.component.scss'],
    animations: [
        trigger('animator', [
            state('hidden',
                style({ maxWidth: '0px' })),
            state('showed',
                style({ maxWidth: '{{maxWidth}}px' }),
                { params: { maxWidth: 0 } }),
            transition('hidden => showed', [
                animate('.4s')
            ]),
            transition('showed => hidden', [
                animate('.05s')
            ]),
        ])
    ],
    host: {
        '[@animator]': 'animator'
    }
})
export class LightboxThumbnailsComponent {

    public animator: ThumbnailAnimatorState = { value: 'hidden' };

    @Input('items') public items: Item[] = [];

    public close(): void {

        this.animator = { value: 'hidden' };
    }

    public open(): void {


        this.animator = { value: 'showed', params: { maxWidth: this._getMaxWidth } };
    }

    public toggle(): void {

        if (this.animator.value === 'hidden') {

            this.animator = { value: 'showed', params: { maxWidth: this._getMaxWidth } };
        } else {

            this.animator = { value: 'hidden' };
        }
    }

    public resize(): void {
        if (this.animator.value === 'showed') {

            this.animator = { value: 'showed', params: { maxWidth: this._getMaxWidth } };
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
        if (window.innerWidth > 599) {
            maxWidth = 150;
        }
        return maxWidth;
    }
}
