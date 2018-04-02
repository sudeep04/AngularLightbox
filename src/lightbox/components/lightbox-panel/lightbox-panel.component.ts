import { Component, HostBinding, HostListener } from '@angular/core';
import { trigger, state, query, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
    selector: 'lightbox-panel',
    templateUrl: './lightbox-panel.component.html',
    styleUrls: ['./lightbox-panel.component.scss'],
    animations: [
        trigger('fadeAnimator', [
            state('hide', style({ opacity: 0 })),
            state('show', style({ opacity: .8 })),
            transition('show => hide', [
                animate('.05s'),
            ]),
            transition('hide => show', [
                animate('.2s')
            ])
        ]),
        trigger('headerShowAnimator', [
            state('hide', style({ top: '-64px' })),
            state('show', style({ top: '0px' })),
            transition('show => hide', [
                animate('.05s')
            ]),
            transition('hide => show', [
                animate('.2s')
            ])
        ])
    ],
    host: {
        '[style.pointer-events]': '_pointerEvents'
    }
})
export class LightboxPanelComponent {

    private _items: Lightbox.LightboxItem[] = [];

    private _activeItem: Lightbox.LightboxItem;

    private _state: 'closed' | 'opened' = 'closed';

    private _pointerEvents: string = 'none';

    private _fadeAnimator: 'show' | 'hide' = 'hide';

    private _headerShowAnimator: 'show' | 'hide' = 'hide';

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this._pointerEvents = 'auto';
        this._items = items;
        this._fadeAnimator = 'show';
        this._headerShowAnimator = 'show';
        this._activeItem = this._items.find(x => x.id == activeItem);
    }

    public close() {

        this._pointerEvents = 'none';
        this._items = [];
        this._activeItem = null;
        this._fadeAnimator = 'hide';
        this._headerShowAnimator = 'hide';
    }

    private _startFadeAnimator(event: AnimationEvent) {

        if (event.fromState === 'hide') {
            this._state = 'opened';
        }
    }

    private _doneFadeAnimator(event: AnimationEvent) {

        if (event.toState === 'hide') {
            this._state = 'closed';
        }
    }

    public toggleHeader() {

        if (this._headerShowAnimator == 'show') {
            this._headerShowAnimator = 'hide';
        } else {
            this._headerShowAnimator = 'show';
        }
    }
}
