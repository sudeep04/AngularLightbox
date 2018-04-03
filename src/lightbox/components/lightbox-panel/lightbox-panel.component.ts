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
        '[style.pointer-events]': '_pointerEvents',
    }
})
export class LightboxPanelComponent {

    public items: Lightbox.LightboxItem[] = [];

    public activeItem: Lightbox.LightboxItem;

    public fadeAnimator: 'show' | 'hide' = 'hide';

    public headerShowAnimator: 'show' | 'hide' = 'hide';

    @ViewChildren('items') private _itemsRef: QueryList<LightboxImgComponent>;

    private _state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

    private _pointerEvents: string = 'none';

    public get state(): 'closed' | 'opened' {

        return this._state.getValue();
    }

    public get $state(): Observable<'closed' | 'opened'> {

        return this._state.asObservable();
    }

    constructor(private _ngZone: NgZone) { }

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this.items = items;
        this.activeItem = this.items.find((x) => x.id === activeItem);
        this._pointerEvents = 'auto';
        this.fadeAnimator = 'show';
        this.headerShowAnimator = 'show';
    }

    public close() {

        this.fadeAnimator = 'hide';
        this.headerShowAnimator = 'hide';
    }

    public next() {

        const activeItemIndex = this.items.indexOf(this.activeItem);

        if (activeItemIndex >= 0 && activeItemIndex < this.items.length - 1) {
            this._itemsRef.toArray()[activeItemIndex].sliceLeft();
            this._itemsRef.toArray()[activeItemIndex + 1].zoomDefault();
            this.activeItem = this.items[activeItemIndex + 1];
        }
    }

    public back() {

        const activeItemIndex = this.items.indexOf(this.activeItem);

        if (activeItemIndex > 0) {
            this._itemsRef.toArray()[activeItemIndex].sliceRight();
            this._itemsRef.toArray()[activeItemIndex - 1].zoomDefault();
            this.activeItem = this.items[activeItemIndex - 1];
        }
    }

    public toggleHeader() {

        if (this.headerShowAnimator === 'show') {
            this.headerShowAnimator = 'hide';
        } else {
            this.headerShowAnimator = 'show';
        }
    }

    public startFadeAnimator(event: AnimationEvent) {

        if (event.fromState === 'hide') {

            const activeItemIndex = this.items.indexOf(this.activeItem);

            this._state.next('opened');
            this._initItems();
            this._itemsRef.toArray()[activeItemIndex].initOnCenter();
            const subscription = this._itemsRef.toArray()[activeItemIndex].$animationDone.skip(1).subscribe((animationState) => {
                if (animationState === 'visible') {
                    this._itemsRef.toArray()[activeItemIndex].zoomDefault();
                    subscription.unsubscribe();
                }
            });
        }
    }

    public doneFadeAnimator(event: AnimationEvent) {

        if (event.toState === 'hide') {
            this._pointerEvents = 'none';
            this._state.next('closed');
            this.items = [];
            this.activeItem = null;
        }
    }

    @HostListener('window:resize', ['$event'])
    private _onResize(event) {

        if (this._state.getValue() === 'opened') {

            const activeItemIndex = this.items.indexOf(this.activeItem);

            this._initItems();
            this._itemsRef.toArray()[activeItemIndex].zoomDefault();
        }
    }

    private _initItems() {

        const activeItemIndex = this.items.indexOf(this.activeItem);

        this.items.forEach((item) => {

            const itemIndex = this.items.indexOf(item);

            if (itemIndex < activeItemIndex) {
                this._itemsRef.toArray()[itemIndex].initOnLeft();
            }
            if (itemIndex > activeItemIndex) {
                this._itemsRef.toArray()[itemIndex].initOnRight();
            }
        });
    }
}
