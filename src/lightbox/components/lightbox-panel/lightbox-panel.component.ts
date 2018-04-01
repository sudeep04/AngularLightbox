import { Component, HostBinding, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
    selector: 'lightbox-panel',
    templateUrl: './lightbox-panel.component.html',
    styleUrls: ['./lightbox-panel.component.scss'],
    animations: [
        trigger('fadeAnimator', [
            state('hide', style({ opacity: 0 })),
            state('show', style({ opacity: 1 })),
            transition('show => hide', [
                style({ opacity: 1 }),
                animate('.05s')
            ]),
            transition('hide => show', [
                style({ opacity: 0 }),
                animate('.5s')
            ]),
            transition('void => *', animate(0))
        ])
    ],
    host: {
        '[style.pointer-events]': '_pointerEvents',
        '[@fadeAnimator]': '_fadeAnimator',
        '(@fadeAnimator.start)': '_startFadeAnimator($event)',
        '(@fadeAnimator.done)': '_doneFadeAnimator($event)'
    }
})
export class LightboxPanelComponent {

    private _items: Lightbox.LightboxItem[] = [];

    private _state: 'closed' | 'opened' = 'closed';

    private _pointerEvents: string = 'none';

    private _fadeAnimator: 'show' | 'hide' = 'hide';

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this._pointerEvents = 'auto';
        this._items = items;
        this._fadeAnimator = 'show';
    }

    public close() {

        this._pointerEvents = 'none';
        this._items = [];
        this._fadeAnimator = 'hide';
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
}
