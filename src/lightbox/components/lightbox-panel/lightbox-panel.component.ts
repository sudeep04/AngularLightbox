import { Component, ViewChild, NgZone, QueryList, ViewChildren, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LightboxImgComponent } from '../lightbox-img/lightbox-img.component';

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
        ])
    ],
    host: {
        '[style.pointer-events]': '_pointerEvents'
    }
})
export class LightboxPanelComponent {

    private _items: Lightbox.LightboxItem[] = [];

    private _activeItem: Lightbox.LightboxItem;

    @ViewChildren('items') private _itemsRef: QueryList<LightboxImgComponent>;

    private _state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

    private _pointerEvents: string = 'none';

    private _fadeAnimator: 'show' | 'hide' = 'hide';

    private _headerShowAnimator: 'show' | 'hide' = 'hide';

    public get state(): 'closed' | 'opened' {

        return this._state.getValue();
    }

    public get $state(): Observable<'closed' | 'opened'> {

        return this._state.asObservable();
    }

    constructor(private _ngZone: NgZone) { }

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this._items = items;
        this._activeItem = this._items.find((x) => x.id === activeItem);
        this._pointerEvents = 'auto';
        this._fadeAnimator = 'show';
        this._headerShowAnimator = 'show';
    }

    public close() {

        this._fadeAnimator = 'hide';
        this._headerShowAnimator = 'hide';
    }

    public next() {

        const activeItemIndex = this._items.indexOf(this._activeItem);

        if (activeItemIndex >= 0 && activeItemIndex < this._items.length - 1) {
            this._itemsRef.toArray()[activeItemIndex].sliceLeft();
            this._itemsRef.toArray()[activeItemIndex + 1].zoomDefault();
            this._activeItem = this._items[activeItemIndex + 1];
        }
    }

    public back() {

        const activeItemIndex = this._items.indexOf(this._activeItem);

        if (activeItemIndex > 0) {
            this._itemsRef.toArray()[activeItemIndex].sliceRight();
            this._itemsRef.toArray()[activeItemIndex - 1].zoomDefault();
            this._activeItem = this._items[activeItemIndex - 1];
        }
    }

    public toggleHeader() {

        if (this._headerShowAnimator === 'show') {
            this._headerShowAnimator = 'hide';
        } else {
            this._headerShowAnimator = 'show';
        }
    }

    @HostListener('window:resize', ['$event'])
    private _onResize(event) {

        this._initItems();
    }

    private _startFadeAnimator(event: AnimationEvent) {

        if (event.fromState === 'hide') {

            const activeItemIndex = this._items.indexOf(this._activeItem);

            this._initItems();
            const subscription = this._itemsRef.toArray()[activeItemIndex].$animationDone.skip(1).subscribe((animationState) => {
                if (animationState === 'visible') {
                    this._itemsRef.toArray()[activeItemIndex].zoomDefault();
                    subscription.unsubscribe();
                }
            });
        }
    }

    private _initItems() {

        const activeItemIndex = this._items.indexOf(this._activeItem);

        this._items.forEach((item) => {

            const itemIndex = this._items.indexOf(item);

            if (itemIndex < activeItemIndex) {
                this._itemsRef.toArray()[itemIndex].initOnLeft();
            }
            if (itemIndex === activeItemIndex) {
                this._itemsRef.toArray()[itemIndex].initOnCenter();
            }
            if (itemIndex > activeItemIndex) {
                this._itemsRef.toArray()[itemIndex].initOnRight();
            }
        });
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
