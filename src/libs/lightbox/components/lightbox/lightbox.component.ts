import { Component, ViewChild, QueryList, ViewChildren, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { Item } from '../../models/item';
import { Position } from '../../models/position.interface';
import { LightboxHeaderComponent } from '../lightbox-header/lightbox-header.component';
import { LightboxItemComponent } from '../ligthbox-item/lightbox-item.component';
import { Video } from '../../models/video';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
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
        trigger('navigationNextAnimator', [
            state('hide', style({ left: '120px', right: '0px' })),
            state('show', style({ left: '0px', right: '0px' })),
            transition('show => hide', [
                animate('.05s')
            ]),
            transition('hide => show', [
                animate('.2s')
            ])
        ]),
        trigger('navigationPreviousAnimator', [
            state('hide', style({ left: '-80px', right: '0px' })),
            state('show', style({ left: '0px', right: '0px' })),
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
export class LightboxComponent {

    public displayPlayer: 'hidden' | 'visible' = 'hidden';

    public navigationNextAnimator: 'hide' | 'show' = 'hide';

    public navigationPreviousAnimator: 'hide' | 'show' = 'hide';

    @ViewChild('header') public header: LightboxHeaderComponent;

    @ViewChild('next') public next: LightboxButtonComponent;

    @ViewChild('previous') public previous: LightboxButtonComponent;

    public hasNext: boolean;

    public hasPrevious: boolean;

    public items: { [container: string]: Item[] } = {};

    public activeItem: Item;

    public fadeAnimator: 'show' | 'hide' = 'hide';

    public readonly state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

    @ViewChildren('lightboxItem') private _itemsRef: QueryList<LightboxItemComponent>;

    private _pointerEvents: string = 'none';

    public addItem(item: Item): void {

        if (!this.items[item.container]) {

            this.items[item.container] = [];
        }
        this.items[item.container].push(item);
    }

    public removeItem(item: Item): void {

        const index = this.items[item.container].indexOf(item);
        if (index > -1) {
            this.items[item.container].splice(index, 1);
        }
    }

    public openItem(item: Item, position: Position): void {

        this.activeItem = item;
        this.state.next('opened');
        this._pointerEvents = 'auto';
        this.header.open();
        this.fadeAnimator = 'show';

        this._navigationShow();

        setTimeout(() => {

            const itemIndex = this.items[item.container].indexOf(item);
            const itemRef = this._itemsRef.toArray()[itemIndex];

            if (itemRef) {

                itemRef.animateOrigin(position).done(() => {

                    if (itemRef) {

                        itemRef.animateCenter().done(() => {

                            if (itemRef.isVideo()) {

                                itemRef.animateNull();
                                this.displayPlayer = 'visible';
                            } else {

                                this.displayPlayer = 'hidden';
                            }
                        });
                    }
                });

                this._checkNavigation();
            }
        }, 0);
    }

    public onClose(): void {

        this._pointerEvents = 'none';
        this.activeItem = undefined;
        this.header.close();
        this.state.next('closed');
        this.fadeAnimator = 'hide';
        this.displayPlayer = 'hidden';
        this._navigationHide();
    }

    public onToggle(): void {

        this.header.toggle();

        if (this.navigationNextAnimator === 'show') {

            this.navigationNextAnimator = 'hide';
        } else {

            this.navigationNextAnimator = 'show';
        }
        if (this.navigationPreviousAnimator === 'show') {

            this.navigationPreviousAnimator = 'hide';
        } else {

            this.navigationPreviousAnimator = 'show';
        }
    }

    public onNext() {

        const activeItemIndex = this.items[this.activeItem.container].indexOf(this.activeItem);

        if (activeItemIndex >= 0 && activeItemIndex < this.items[this.activeItem.container].length - 1) {

            const activeItemRef = this._itemsRef.toArray()[activeItemIndex];
            const nextItemRef = this._itemsRef.toArray()[activeItemIndex + 1];

            if (activeItemRef.isVideo()) {

                this.displayPlayer = 'hidden';
                activeItemRef.animateCenter().done(() => {

                    activeItemRef.animateLeft();
                });
            } else {
                activeItemRef.animateLeft();
            }
            this.activeItem = this.items[this.activeItem.container][activeItemIndex + 1];
            nextItemRef.animateRight().done(() => {
                nextItemRef.animateCenter().done(() => {

                    if (nextItemRef.isVideo()) {

                        nextItemRef.animateNull();
                        this.displayPlayer = 'visible';
                    } else {

                        this.displayPlayer = 'hidden';
                    }
                });
            });
        }
        this._checkNavigation();
    }

    public onPrevious() {

        const activeItemIndex = this.items[this.activeItem.container].indexOf(this.activeItem);

        if (activeItemIndex > 0) {

            const activeItemRef = this._itemsRef.toArray()[activeItemIndex];
            const previousItemRef = this._itemsRef.toArray()[activeItemIndex - 1];

            if (activeItemRef.isVideo()) {
                this.displayPlayer = 'hidden';
                activeItemRef.animateCenter().done(() => {

                    activeItemRef.animateRight();
                });
            } else {
                activeItemRef.animateRight();
            }
            this.activeItem = this.items[this.activeItem.container][activeItemIndex - 1];

            previousItemRef.animateLeft().done(() => {
                previousItemRef.animateCenter().done(() => {
                    
                    if (previousItemRef.isVideo()) {

                        previousItemRef.animateNull();
                        this.displayPlayer = 'visible';
                    } else {

                        this.displayPlayer = 'hidden';
                    }
                });
            });
        }
        this._checkNavigation();
    }

    public onReady(event: YT.PlayerEvent): void {

        //on ready
    }

    public onError(event: YT.OnErrorEvent) {
        // on error
    }

    public onChange(event): void {
        // on change
        console.log(event.data)
        switch(event.data) {
            case YT.PlayerState.PLAYING:
                this.header.close();
                this.navigationNextAnimator = 'hide';
                this.navigationPreviousAnimator = 'hide';
                break; 
            case YT.PlayerState.PAUSED:
                this.header.open();
                this.navigationNextAnimator = 'show';
                this.navigationPreviousAnimator = 'show';

                break;
        }
    }

    @HostListener('window:resize', ['$event'])
    private _onResize(event) {

        if (this.activeItem) {

            const activeItemIndex = this.items[this.activeItem.container].indexOf(this.activeItem);
            const itemRef = this._itemsRef.toArray()[activeItemIndex];

            if (!itemRef.isVideo()) {

                itemRef.animateCenter();
            }
        }
    }

    private _navigationShow() {

        this.navigationNextAnimator = 'show';
        this.navigationPreviousAnimator = 'show';
    }

    private _navigationHide() {

        this.navigationNextAnimator = 'hide';
        this.navigationPreviousAnimator = 'hide';
    }

    private _checkNavigation() {

        const activeItemIndex = this.items[this.activeItem.container].indexOf(this.activeItem);

        if (activeItemIndex > 0) {
            this.hasPrevious = true;
        } else {
            this.hasPrevious = false;
        }

        if (activeItemIndex >= 0 && activeItemIndex < this.items[this.activeItem.container].length - 1) {
            this.hasNext = true;
        } else {
            this.hasNext = false;
        }
    }
}
