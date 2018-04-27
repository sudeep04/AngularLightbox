import { Component, ViewChild, QueryList, ViewChildren, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { Item } from '../../models/item';
import { Position } from '../../models/position.interface';
import { LightboxHeaderComponent } from '../lightbox-header/lightbox-header.component';
import { LightboxItemComponent } from '../ligthbox-item/lightbox-item.component';
import { Video } from '../../models/video';
import { LightboxImgControlComponent } from '../lightbox-img-control/lightbox-img-control.component';
import { LightboxThumbnailsComponent } from '../lightbox-thumbnails/lightbox-thumbnails.component';
import { Pagination } from '../../models/pagination.interface';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    animations: [
        trigger('fadeAnimator', [
            state('hide', style({ backgroundColor: 'rgba(0,0,0,0)' })),
            state('show', style({ backgroundColor: 'rgba(0,0,0,.9)' })),
            transition('show => hide', [
                animate('.05s'),
            ]),
            transition('hide => show', [
                animate('.4s')
            ])
        ]),
        trigger('headerShowAnimator', [
            state('hide', style({ top: '-64px' })),
            state('show', style({ top: '0px' })),
            transition('show => hide', [
                animate('.05s')
            ]),
            transition('hide => show', [
                animate('.4s')
            ])
        ]),
        trigger('navigationNextAnimator', [
            state('hide', style({ left: '144px', right: '0px' })),
            state('show', style({ left: '0px', right: '0px' })),
            transition('show => hide', [
                animate('.05s')
            ]),
            transition('hide => show', [
                animate('.4s')
            ])
        ]),
        trigger('navigationPreviousAnimator', [
            state('hide', style({ left: '-104px', right: '0px' })),
            state('show', style({ left: '0px', right: '0px' })),
            transition('show => hide', [
                animate('.05s')
            ]),
            transition('hide => show', [
                animate('.4s')
            ])
        ])
    ],
    host: {
        '[style.pointer-events]': '_pointerEvents',
    }
})
export class LightboxComponent {

    public pagination: Pagination = { current: 0, count: 0 };

    public displayPlayer: 'hidden' | 'visible' = 'hidden';

    public displayImgControls: 'hidden' | 'visible' = 'hidden';

    public navigationNextAnimator: 'hide' | 'show' = 'hide';

    public navigationPreviousAnimator: 'hide' | 'show' = 'hide';

    @ViewChild('header') public header: LightboxHeaderComponent;

    @ViewChild('thumbnails') public thumbnails: LightboxThumbnailsComponent;

    @ViewChild('controls') public imgControls: LightboxImgControlComponent;

    @ViewChild('next') public next: LightboxButtonComponent;

    @ViewChild('previous') public previous: LightboxButtonComponent;

    public hasNext: boolean;

    public hasPrevious: boolean;

    public items: { [container: string]: Item[] } = {};

    public activeItem: Item;

    public fadeAnimator: 'show' | 'hide' = 'hide';

    public readonly state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

    public disableZoomIn: boolean;

    public disableZoomOut: boolean;

    public disableResetZoom: boolean;

    public disableFeetToWidth: boolean;

    private _ytPlayer: YT.Player;

    @ViewChildren('lightboxItem') private _itemsRef: QueryList<LightboxItemComponent>;

    private _pointerEvents: string = 'none';

    public addItem(item: Item): void {

        if (!this.items[item.container]) {

            this.items[item.container] = [];
        }

        this.items[item.container].push(item);
    }

    public thumbnailsToggle() {

        this.thumbnails.toggle();
    }

    public removeItem(item: Item): void {

        const index = this._itemIndex(item);

        if (index > -1) {
            this.items[item.container].splice(index, 1);
        }
    }

    public openItem(item: Item, position: Position): void {

        this.activeItem = item;
        this.state.next('opened');
        this._pointerEvents = 'auto';
        this.fadeAnimator = 'show';
        this._openControls();

        setTimeout(() => {

            const itemIndex = this._itemIndex(item);
            this.pagination.current = itemIndex + 1;
            this.pagination.count = this.items[item.container].length;
            this.thumbnails.selectItem(this.activeItem);
            const itemRef = this._itemRef(itemIndex);

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

                this._checkImgControls();
                this._checkImageControlVisibility(itemRef);
            }
        }, 0);
    }

    public onClose(): void {

        this._pointerEvents = 'none';
        this.activeItem = undefined;
        this.state.next('closed');
        this.fadeAnimator = 'hide';
        this.displayPlayer = 'hidden';
        this._closeControls();
        if (this._ytPlayer) {

            this._ytPlayer.stopVideo();
        }
    }

    public onToggle(): void {

        this.header.toggle();
        this.imgControls.toggle();

        if (this.navigationNextAnimator === 'show') {

            this.navigationNextAnimator = 'hide';
            this.navigationPreviousAnimator = 'hide';
            this.thumbnails.close();
        } else {

            this.navigationNextAnimator = 'show';
            this.navigationPreviousAnimator = 'show';
            this.thumbnails.open();
        }
    }

    public selectItem(item: Item): void {

        const activeItem = this.activeItem;
        const activeItemIndex = this._itemIndex(activeItem);
        const activeItemRef = this._itemRef(activeItemIndex);

        const itemIndex = this._itemIndex(item);
        const itemRef = this._itemRef(itemIndex);

        this.pagination.current = itemIndex + 1;
        this.activeItem = item;
        this.thumbnails.selectItem(item);
        this._checkImgControls();

        if (activeItemRef.isVideo()) {

            this.displayPlayer = 'hidden';
            activeItemRef.animateCenter().done(() => {

                if (activeItem !== this.activeItem) {
                    if (itemIndex < activeItemIndex) {
                        activeItemRef.animateRight();
                    } else {
                        activeItemRef.animateLeft();
                    }
                }
            });
        } else {

            if (activeItem !== this.activeItem) {
                if (itemIndex < activeItemIndex) {
                    activeItemRef.animateRight();
                } else {
                    activeItemRef.animateLeft();
                }
            }
        }

        if (itemIndex < activeItemIndex) {
            itemRef.animateLeft().done(() => {

                if (item === this.activeItem) {

                    itemRef.animateCenter().done(() => {

                        if (itemRef.isVideo()) {

                            itemRef.animateNull();
                            this.displayPlayer = 'visible';
                        } else {

                            this._checkImageControlVisibility(itemRef);
                            this.displayPlayer = 'hidden';
                        }
                    });
                }
            });
        } else {
            itemRef.animateRight().done(() => {

                if (item === this.activeItem) {

                    itemRef.animateCenter().done(() => {

                        if (itemRef.isVideo()) {

                            itemRef.animateNull();
                            this.displayPlayer = 'visible';
                        } else {

                            this._checkImageControlVisibility(itemRef);
                            this.displayPlayer = 'hidden';
                        }
                    });
                }
            });
        }
    }

    public onNext() {

        const activeItemIndex = this._itemIndex(this.activeItem);

        if (activeItemIndex >= 0 && activeItemIndex < this.items[this.activeItem.container].length - 1) {

            const item = this.items[this.activeItem.container][activeItemIndex + 1];
            this.selectItem(item);
        }
    }

    public onLast() {

        const activeItemIndex = this._itemIndex(this.activeItem);

        if (activeItemIndex >= 0 && activeItemIndex < this.items[this.activeItem.container].length - 1) {

            const item = this.items[this.activeItem.container][this.items[this.activeItem.container].length - 1];
            this.selectItem(item);
        }
    }

    public zoomIn() {
        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem));
        activeItemRef.zoomIn();
        this._checkImageControlVisibility(activeItemRef);
    }

    public zoomOut() {
        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem));
        activeItemRef.zoomOut();
        this._checkImageControlVisibility(activeItemRef);
    }

    public resetZoom() {

        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem));
        activeItemRef.resetZoom();
        this._checkImageControlVisibility(activeItemRef);
    }

    public feetToWidth() {

        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem));
        activeItemRef.feetToWidth();
        this._checkImageControlVisibility(activeItemRef);
    }

    public onFirst() {

        const activeItemIndex = this._itemIndex(this.activeItem);

        if (activeItemIndex > 0) {

            const item = this.items[this.activeItem.container][0];
            this.selectItem(item);
        }
    }

    public onPrevious() {

        const activeItemIndex = this._itemIndex(this.activeItem);

        if (activeItemIndex > 0) {

            const item = this.items[this.activeItem.container][activeItemIndex - 1];
            this.selectItem(item);
        }
    }

    public onReady(event: YT.PlayerEvent): void {

        this._ytPlayer = event.target;
    }

    public onError(event: YT.OnErrorEvent) {
        // on error
    }

    public onChange(event): void {

        switch (event.data) {
            case YT.PlayerState.PLAYING:
                this._closeControls();
                break;
            case YT.PlayerState.PAUSED:
                this._openControls();
                break;
        }
    }

    private _itemRef(index: number): LightboxItemComponent {

        return this._itemsRef.toArray()[index];
    }

    private _itemIndex(item: Item): number {

        return this.items[item.container].indexOf(item);
    }

    @HostListener('window:resize', ['$event'])
    private _onResize(event) {

        if (this.activeItem) {

            const activeItemRef = this._itemRef(this._itemIndex(this.activeItem));

            if (!activeItemRef.isVideo()) {

                activeItemRef.resize();
                this.thumbnails.resize();
                this._checkImageControlVisibility(activeItemRef);
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

    private _checkImgControls() {

        if (this._itemRef(this._itemIndex(this.activeItem)).isVideo()) {

            this.displayImgControls = 'hidden';
        } else {

            this.displayImgControls = 'visible';
        }
    }

    private _checkImageControlVisibility(item: LightboxItemComponent) {

        this.disableZoomIn = item.position + 1 === item.zoomMax;
        this.disableZoomOut = item.position === 0;
        this.disableResetZoom = item.position === 0;
        this.disableFeetToWidth = item.position === item.feetToWidthPosition;
    }

    private _openControls(): void {

        this.header.open();
        this.imgControls.open();
        this._navigationShow();
        this.thumbnails.open();
    }

    private _closeControls(): void {

        this.header.close();
        this.imgControls.close();
        this._navigationHide();
        this.thumbnails.close();
    }
}
