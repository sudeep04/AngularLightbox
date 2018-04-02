import { Component, HostBinding, HostListener } from '@angular/core';
import { trigger, state, query, style, transition, animate, AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'lightbox-panel',
    templateUrl: './lightbox-panel.component.html',
    styleUrls: ['./lightbox-panel.component.scss'],
    animations: [
        trigger('fadeAnimator', [
            state('hide', style({ opacity: 0 })),
            state('show', style({ opacity: .9 })),
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
        ]),
        trigger('openItemAnimator', [
            state('top',
                style({ top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600 } }),
            state('origen',
                style({ top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600 } }),
            transition('origen => top', [
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

    private _state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

    private _pointerEvents: string = 'none';

    private _fadeAnimator: 'show' | 'hide' = 'hide';

    private _openItemAnimator: Lightbox.OpenItemAnimatorState = { value: 'origen' };

    private _headerShowAnimator: 'show' | 'hide' = 'hide';

    public get state(): 'closed' | 'opened' {
        return this._state.getValue();
    }

    public get $state(): Observable<'closed' | 'opened'> {
        return this._state.asObservable();
    }

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this._items = items;
        this._activeItem = this._items.find((x) => x.id === activeItem);
        this._pointerEvents = 'auto';
        this._fadeAnimator = 'show';
        this._headerShowAnimator = 'show';
        this._openItemAnimator = {
            value: 'origen',
            params: {
                width: this._activeItem.width,
                height: this._activeItem.height,
                offsetLeft: this._activeItem.offsetLeft,
                offsetTop: this._activeItem.offsetTop
            }
        };

    }

    public close() {

        this._fadeAnimator = 'hide';
        this._headerShowAnimator = 'hide';
        this._openItemAnimator = {
            value: 'origen',
            params: {
                width: this._activeItem.width,
                height: this._activeItem.height,
                offsetLeft: this._activeItem.offsetLeft,
                offsetTop: this._activeItem.offsetTop
            }
        };
    }

    public toggleHeader() {

        if (this._headerShowAnimator === 'show') {
            this._headerShowAnimator = 'hide';
        } else {
            this._headerShowAnimator = 'show';
        }
    }

    private _startFadeAnimator(event: AnimationEvent) {

        if (event.fromState === 'hide') {

            this._state.next('opened');

            const maxWidth = window.innerWidth * 2 / 3;
            const maxHeight = window.innerHeight * 3 / 4;

            let width: number;
            let height: number;

            if (this._activeItem.originalWidth / maxWidth > this._activeItem.originalHeight / maxHeight) {
                height = Math.round(maxWidth / this._activeItem.originalWidth * this._activeItem.originalHeight);
                width = Math.round(maxWidth);
            } else {
                width = Math.round(maxHeight / this._activeItem.originalHeight * this._activeItem.originalWidth);
                height = Math.round(maxHeight);
            }

            this._openItemAnimator = {
                value: 'top',
                params: {
                    width,
                    height,
                    offsetLeft: Math.round((window.innerWidth - width) / 2),
                    offsetTop: Math.round((window.innerHeight - height) / 2)
                }
            };
        }
    }

    private _doneFadeAnimator(event: AnimationEvent) {

        if (event.toState === 'hide') {

            this._pointerEvents = 'none';
            this._state.next('closed');
            this._items = [];
            this._activeItem = null;
        }
    }
}
