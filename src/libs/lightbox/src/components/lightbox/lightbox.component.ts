import { Component, ViewChild, QueryList, ViewChildren, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {  } from '@types/youtube';
import { Pagination } from '../../models/pagination.interface';
import { LightboxToolbarComponent } from '../lightbox-toolbar/lightbox-toolbar.component';
import { LightboxThumbnailsComponent } from '../lightbox-thumbnails/lightbox-thumbnails.component';
import { LightboxImgControlComponent } from '../lightbox-img-control/lightbox-img-control.component';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { Item } from '../../models/item';
import { BackgroundFadeAnimation } from '../../models/background-fade-animation.interface';
import { LightboxItemComponent } from '../lightbox-item/lightbox-item.component';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';
import { Video } from '../../models/video';
import { Position } from '../../models/position.interface';

@Component({
    selector: 'lightbox',
    templateUrl: 'lightbox.component.html',
    styleUrls: ['lightbox.component.scss'],
    animations: [
        trigger('backgroundFadeAnimation', [
            state('hidden', style({ opacity: '0' }), { params: { duration: 0, opacity: 0 } }),
            state('visible', style({ opacity: '{{opacity}}' }), { params: { duration: 0, opacity: 0 } }),
            transition('visible => hidden', [
                animate('{{duration}}s'),
            ], { params: { duration: 0, opacity: 0 } }),
            transition('hidden => visible', [
                animate('{{duration}}s')
            ], { params: { duration: 0, opacity: 0 } })
        ])
    ],
    host: {
        '[style.pointer-events]': '_pointerEvents',
    },
    encapsulation: ViewEncapsulation.None
})
export class LightboxComponent implements OnInit {

    public pagination: Pagination = { current: 0, count: 0 };

    public displayPlayer: 'hidden' | 'visible' = 'hidden';

    public displayImgControls: 'hidden' | 'visible' = 'hidden';

    public navigationNextAnimator: 'hide' | 'show' = 'hide';

    public navigationPreviousAnimator: 'hide' | 'show' = 'hide';

    @ViewChild('toolbar') public toolbar: LightboxToolbarComponent;

    @ViewChild('thumbnails') public thumbnails: LightboxThumbnailsComponent;

    @ViewChild('controls') public imgControls: LightboxImgControlComponent;

    @ViewChild('next') public next: LightboxButtonComponent;

    @ViewChild('previous') public previous: LightboxButtonComponent;

    public hasNext: boolean;

    public hasPrevious: boolean;

    public items: { [container: string]: Item[] } = {};

    public activeItem: Item | undefined;

    public backgroundFadeAnimation: BackgroundFadeAnimation;

    public readonly state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

    public disableZoomIn: boolean;

    public disableZoomOut: boolean;

    public disableResetZoom: boolean;

    public disableFeetToWidth: boolean;

    private _ytPlayer: YT.Player;

    @ViewChildren('lightboxItem') private _itemsRef: QueryList<LightboxItemComponent>;

    private _pointerEvents: string = 'none';

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {
        this.backgroundFadeAnimation = { value: 'hidden', params: { duration: this.config.animations.backgroundFadeOut.duration, opacity: 0 } };
    }

    public getYoutubeVideoId(): string {

        return (this.activeItem as Video).youtubeVieoId;
    }

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
        this.backgroundFadeAnimation = {
            value: 'visible', params: {
                duration: this.config.animations.backgroundFadeIn.duration,
                opacity: this.config.animations.backgroundFadeIn.opacity
            }
        };
        this._openControls();

        setTimeout(() => {

            if (this.activeItem) {
                const itemIndex = this._itemIndex(item);
                this.pagination.current = itemIndex + 1;
                this.pagination.count = this.items[item.container].length;
                this.thumbnails.selectItem(this.activeItem!);
                const itemRef = this._itemRef(itemIndex);

                if (itemRef) {

                    itemRef.open(position, () => {
                        if (itemRef.isVideo()) {

                            this.displayPlayer = 'visible';
                        } else {

                            this.displayPlayer = 'hidden';
                        }
                    });

                    this._checkImgControls();
                    this._checkImageControlVisibility(itemRef);
                }
            }
        }, 0);
    }

    public onClose(): void {

        this._pointerEvents = 'none';
        this.activeItem = undefined;
        this.state.next('closed');
        this.backgroundFadeAnimation = { value: 'hidden', params: { duration: this.config.animations.backgroundFadeOut.duration, opacity: 0 } };
        this.displayPlayer = 'hidden';
        this._closeControls();
        if (this._ytPlayer) {

            this._ytPlayer.stopVideo();
        }
    }

    public onToggle(): void {

        this.toolbar.toggle();
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

        if (this.activeItem) {

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
            }

            if (activeItem !== this.activeItem) {
                if (itemIndex < activeItemIndex) {
                    activeItemRef.slice('right');
                } else {
                    activeItemRef.slice('left');
                }
            }
            if (itemIndex < activeItemIndex) {
                itemRef.slice('left', () => {
                    if (item === this.activeItem) {
                        itemRef.slice('center', () => {
                            if (itemRef.isVideo()) {

                                this.displayPlayer = 'visible';
                            } else {

                                this._checkImageControlVisibility(itemRef);
                                this.displayPlayer = 'hidden';
                            }
                        });
                    }
                });
            } else {
                itemRef.slice('right', () => {
                    if (item === this.activeItem) {
                        itemRef.slice('center', () => {
                            if (itemRef.isVideo()) {

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
    }

    public onNext() {

        const activeItemIndex = this._itemIndex(this.activeItem!);

        if (activeItemIndex >= 0 && activeItemIndex < this.items[this.activeItem!.container].length - 1) {

            const item = this.items[this.activeItem!.container][activeItemIndex + 1];
            this.selectItem(item);
        }
    }

    public onLast() {

        const activeItemIndex = this._itemIndex(this.activeItem!);

        if (activeItemIndex >= 0 && activeItemIndex < this.items[this.activeItem!.container].length - 1) {

            const item = this.items[this.activeItem!.container][this.items[this.activeItem!.container].length - 1];
            this.selectItem(item);
        }
    }

    public zoomIn() {
        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem!));
        activeItemRef.zoomIn(() => {

            this._checkImageControlVisibility(activeItemRef);
        });
    }

    public zoomOut() {
        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem!));
        activeItemRef.zoomOut(() => {

            this._checkImageControlVisibility(activeItemRef);
        });
    }

    public resetZoom() {

        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem!));
        activeItemRef.resetZoom(() => {

            this._checkImageControlVisibility(activeItemRef);
        });
    }

    public feetToWidth() {

        const activeItemRef = this._itemRef(this._itemIndex(this.activeItem!));
        activeItemRef.feetToWidth(() => {

            this._checkImageControlVisibility(activeItemRef);
        });
    }

    public onFirst() {

        const activeItemIndex = this._itemIndex(this.activeItem!);

        if (activeItemIndex > 0) {

            const item = this.items[this.activeItem!.container][0];
            this.selectItem(item);
        }
    }

    public onPrevious() {

        const activeItemIndex = this._itemIndex(this.activeItem!);

        if (activeItemIndex > 0) {

            const item = this.items[this.activeItem!.container][activeItemIndex - 1];
            this.selectItem(item);
        }
    }

    public onReady(event: YT.PlayerEvent): void {

        this._ytPlayer = event.target;
    }

    public onError(event: YT.OnErrorEvent) {
        // on error
    }

    public onChange(event: any): void {

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
    private _onResize(event: any) {

        if (this.activeItem) {

            const activeItemRef = this._itemRef(this._itemIndex(this.activeItem!));

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

        if (this._itemRef(this._itemIndex(this.activeItem!)).isVideo()) {

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

        this.toolbar.open();
        this.imgControls.open();
        this._navigationShow();
        this.thumbnails.open();
    }

    private _closeControls(): void {

        this.toolbar.close();
        this.imgControls.close();
        this._navigationHide();
        this.thumbnails.close();
    }
}
