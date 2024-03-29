
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter, OnInit, ViewEncapsulation, Optional, NgZone } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, query } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { Item } from '../../models/item';
import { ItemAnimation } from '../../models/item-animation.interface';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';
import { Video } from '../../models/video';
import { AnimatorCallback } from '../../models/animator-callback.interface';
import { Position } from '../../models/position.interface';

@Component({
    selector: 'lightbox-item',
    templateUrl: 'lightbox-item.component.html',
    styleUrls: ['lightbox-item.component.scss'],
    animations: [
        trigger('itemAnimation', [
            state('hidden',
                style({ visibility: 'hidden' })),
            state('origin',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('center',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('left',
                style({ visibility: 'hidden', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('right',
                style({ visibility: 'hidden', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom',
                style({ visibility: 'visible', width: '{{width}}px', height: '{{height}}px' }),
                { params: { width: 0, height: 0 } }),
            state('zooming',
                style({ visibility: 'visible', width: '{{width}}px', height: '{{height}}px' }),
                { params: { width: 0, height: 0 } }),
            state('zoomed',
                style({ visibility: 'visible', width: '{{width}}px', height: '{{height}}px' }),
                { params: { width: 0, height: 0 } }),
            transition('void => *', [
                animate(0)
            ]),
            transition('hidden => *', [
                animate(0)
            ]),
            transition('* => hidden', [
                animate(0)
            ]),
            transition('* => zoom', [
                animate(0)
            ]),
            transition('* => zoomed', [
                animate(0)
            ]),
            transition('* => *', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ])
    ],
    host: {
        '[style.overflow]': 'overflow',
        '[style.visibility]': 'visibility',
        '(dragover)': 'onDrag($event)'
    }
})
export class LightboxItemComponent implements OnInit {

    @Input('item') public item: Item;

    @Output() public toggleEvent = new EventEmitter();

    public itemAnimation: ItemAnimation;

    public overflow: 'hidden' | 'auto' = 'auto';

    public visibility: 'hidden' | 'visible' = 'hidden';

    @ViewChild('img') private _img: ElementRef;

    private _isVideo: boolean;

    private _itemAnimationStart: BehaviorSubject<'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed'>
        = new BehaviorSubject<'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed'>('hidden');

    private _itemAnimationDone: BehaviorSubject<'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed'>
        = new BehaviorSubject<'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed'>('hidden');

    private _zoomList: Position[];

    private _position = 0;

    private _feetToWidthPosition: number;

    private _dragPositionX: number;

    private _dragPositionY: number;

    private _originScrollTop: number;

    private _originScrollLeft: number;

    private _scrollInterval: any;

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {

        this._isVideo = this.item instanceof Video;
        this.itemAnimation = { value: 'hidden' };
    }

    public isVideo(): boolean {

        return this._isVideo;
    }

    public onClick(event: Event): void {

        if (event.stopPropagation) {
            event.stopPropagation();
        }
        if (!this._isVideo) {

            this.toggleEvent.emit();
        }
    }

    public itemAnimationStart(event: AnimationEvent): void {

        if (event.toState === 'right' || event.fromState === 'right' || event.fromState === 'origin') {

            this.overflow = 'hidden';
        }
        this._itemAnimationStart.next(event.fromState as 'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed');
    }

    public itemAnimationDone(event: AnimationEvent): void {

        if (this.itemAnimation.value === 'left' || this.itemAnimation.value === 'right' || this.itemAnimation.value === 'hidden') {

            this.visibility = 'hidden';
        } else {

            this.visibility = 'visible';
        }

        this.overflow = 'auto';
        this._itemAnimationDone.next(event.toState as 'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed');
    }

    public onDragStart(event: any) {

        this._img.nativeElement.style.cursor = 'move';
        this._dragPositionX = event.screenX;
        this._dragPositionY = event.screenY;
        this._originScrollTop = this._elementRef.nativeElement.scrollTop;
        this._originScrollLeft = this._elementRef.nativeElement.scrollLeft;
    }

    public onDrag(event: any) {

        if (event.screenY) {

            this._elementRef.nativeElement.scrollTop = this._originScrollTop + this._dragPositionY - event.screenY;
        }
        if (event.screenX) {

            this._elementRef.nativeElement.scrollLeft = this._originScrollLeft + this._dragPositionX - event.screenX;
        }
    }

    public onDragEnd(event: any) {

        this._img.nativeElement.style.cursor = 'default';
    }

    public open(position: Position, cb?: () => void): void {

        this._animate(this._getItemAnimation('origin', this._getOriginPosition(position), 0)).done(() => {

            this._animate(this._getItemAnimation('center', this._getCenterPosition(), this.config.animations.itemOpen.duration)).done(() => {

                this._initZoom();
                this._position = 0;
                if (this.isVideo()) {

                    this._animate({ value: 'hidden' });
                }
                if (cb) { cb(); }
            });
        });
    }

    public slice(to: 'center' | 'left' | 'right', cb?: () => void): void {

        let toItemAnimation: ItemAnimation | undefined;

        switch (to) {
            case 'center':
                toItemAnimation = this._getItemAnimation(to, this._getCenterPosition(), this.config.animations.itemSlice.duration);
                break;
            case 'left':
                toItemAnimation = this._getItemAnimation(to, this._getLeftPosition(), this.config.animations.itemSlice.duration);
                break;
            case 'right':
                toItemAnimation = this._getItemAnimation(to, this._getRightPosition(), this.config.animations.itemSlice.duration);
                break;
        }

        this._animate(toItemAnimation as ItemAnimation).done(() => {
            if (to === 'center') {
                this._initZoom();
                this._position = 0;
            }
            if (cb) { cb(); }
        });
    }

    public zoomIn(cb?: () => void): void {

        if (this._position + 1 < this._zoomList.length && this.itemAnimation.value !== 'zooming') {

            this._animate(this._getItemAnimation('zoom', this._getCurrentPosition(), 0)).done(() => {
                this._animate(this._getItemAnimation('zooming', this._zoomList[this._position + 1], this.config.animations.zoomIn.duration)).done(() => {
                    this._animate(this._getItemAnimation('zoomed', this._getCurrentPosition(), 0)).done(() => {

                        this._position++;
                        if (cb) { cb(); }
                    });
                });
            });
        }
    }

    public zoomOut(cb?: () => void): void {

        if (this._position > 0 && this.itemAnimation.value !== 'zooming') {

            this._animate(this._getItemAnimation('zoom', this._getCurrentPosition(), 0)).done(() => {
                this._animate(this._getItemAnimation('zooming', this._zoomList[this._position - 1], this.config.animations.zoomOut.duration)).done(() => {
                    this._animate(this._getItemAnimation('zoomed', this._getCurrentPosition(), 0)).done(() => {

                        this._position--;
                        if (cb) { cb(); }
                    });
                });
            });
        }
    }

    public resetZoom(cb?: () => void): void {

        if (this.itemAnimation.value !== 'zooming') {

            this._animate(this._getItemAnimation('zoom', this._getCurrentPosition(), 0)).done(() => {
                this._animate(this._getItemAnimation('zooming', this._zoomList[0], this.config.animations.resetZoom.duration)).done(() => {
                    this._animate(this._getItemAnimation('zoomed', this._getCurrentPosition(), 0)).done(() => {

                        this._position = 0;
                        if (cb) { cb(); }
                    });
                });
            });
        }
    }

    public feetToWidth(cb?: () => void): void {
        if (this.itemAnimation.value !== 'zooming') {

            this._animate(this._getItemAnimation('zoom', this._getCurrentPosition(), 0)).done(() => {
                this._animate(this._getItemAnimation('zooming', this._zoomList[this._feetToWidthPosition], this.config.animations.feetToWidth.duration)).done(() => {
                    this._animate(this._getItemAnimation('zoomed', this._getCurrentPosition(), 0)).done(() => {

                        this._position = this._feetToWidthPosition;
                        if (cb) { cb(); }
                    });
                });
            });
        }
    }

    public get feetToWidthPosition(): number {

        return this._feetToWidthPosition;
    }

    public get position(): number {

        return this._position;
    }

    public get zoomMax(): number {

        return 7;
    }

    public resize(): void {

        this._initZoom();
        if (this.itemAnimation.value === 'zooming') {
            setTimeout(() => {
                this.resize();
            }, 100);
        } else {
            if (this.itemAnimation.value !== 'left' && this.itemAnimation.value !== 'right') {
                this._animate(this._getItemAnimation('zoom', this._getCurrentPosition(), 0)).done(() => {
                    if (this.itemAnimation.value !== 'left' && this.itemAnimation.value !== 'right') {
                        this._animate(this._getItemAnimation('zooming', this._zoomList[this._position], .4)).done(() => {
                            if (this.itemAnimation.value !== 'left' && this.itemAnimation.value !== 'right') {
                                this._animate(this._getItemAnimation('zoomed', this._getCurrentPosition(), 0));
                            }
                        });
                    }
                });
            }
        }
    }

    private _animate(itemAnimation: ItemAnimation): AnimatorCallback {

        this.itemAnimation = itemAnimation;

        return this._itemAnimationCallBack(itemAnimation.value);
    }

    private _itemAnimationCallBack(itemState: 'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed'): AnimatorCallback {
        return {
            start: (func: () => void) => {
                this._itemAnimationStart.filter((value) => value === itemState).first().subscribe(() => {
                    func();
                });
            },
            done: (func: () => void) => {
                this._itemAnimationDone.filter((value) => value === itemState).first().subscribe(() => {
                    func();
                });
            }
        };
    }

    private _getOriginPosition(position: Position): Position {

        return {
            width: position.width,
            height: position.height,
            offsetLeft: position.offsetLeft - (this._elementRef.nativeElement.clientWidth - position.width) / 2,
            offsetTop: position.offsetTop - (this._elementRef.nativeElement.clientHeight - position.height) / 2
        };
    }

    private _getCenterPosition(): Position {

        const maxWidth = this._elementRef.nativeElement.clientWidth * 2 / 3;
        const maxHeight = (this._elementRef.nativeElement.clientHeight - 128) * 9 / 10;

        let height: number;
        let width: number;

        if (this._img.nativeElement.width / maxWidth > this._img.nativeElement.height / maxHeight) {
            height = Math.round(maxWidth / this._img.nativeElement.width * this._img.nativeElement.height);
            width = Math.round(maxWidth);
        } else {
            width = Math.round(maxHeight / this._img.nativeElement.height * this._img.nativeElement.width);
            height = Math.round(maxHeight);
        }

        return { width, height, offsetTop: 0, offsetLeft: 0 };
    }

    private _getFeetToWidthPosition(): Position {

        let height: number;
        let width: number;

        height = Math.round((this._elementRef.nativeElement.clientWidth - 17) / this._img.nativeElement.width * this._img.nativeElement.height);
        width = Math.round(this._elementRef.nativeElement.clientWidth - 17);

        return { width, height, offsetTop: 0, offsetLeft: 0 };
    }

    private _getLeftPosition(): Position {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;

        if (centerPosition.width > this._elementRef.nativeElement.clientWidth) {
            offsetLeft = centerPosition.width * -1;
        } else {
            offsetLeft = this._elementRef.nativeElement.clientWidth * -1;
        }

        return { width: centerPosition.width, height: centerPosition.height, offsetTop: centerPosition.offsetTop, offsetLeft };
    }

    private _getCurrentPosition(): Position {

        return { width: this._img.nativeElement.clientWidth, height: this._img.nativeElement.clientHeight, offsetTop: 0, offsetLeft: 0 };
    }

    private _getRightPosition(): Position {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;

        if (centerPosition.width > this._elementRef.nativeElement.clientWidth) {
            offsetLeft = centerPosition.width;
        } else {
            offsetLeft = this._elementRef.nativeElement.clientWidth;
        }

        return { width: centerPosition.width, height: centerPosition.height, offsetTop: centerPosition.offsetTop, offsetLeft };
    }

    private _getZoom(zoom: number): Position {

        const step = this._elementRef.nativeElement.clientWidth * zoom / 6;

        const centerPosition = this._getCenterPosition();

        let height: number;
        let width: number;

        height = Math.round((centerPosition.width + step) / this._img.nativeElement.width * this._img.nativeElement.height);
        width = Math.round(centerPosition.width + step);

        return { width, height, offsetTop: 0, offsetLeft: 0 };
    }

    private _initZoom(): void {

        const defaultPosition = this._getCenterPosition();
        const feetToWidthPosition = this._getFeetToWidthPosition();

        this._feetToWidthPosition = Math.round(((feetToWidthPosition.width - defaultPosition.width) / 2) / (this._elementRef.nativeElement.clientWidth / 12));

        this._zoomList = [];

        for (let i = 0; i < 8; i++) {
            if (i === 0) {
                this._zoomList.push(defaultPosition);
                continue;
            }
            if (i === this._feetToWidthPosition) {
                this._zoomList.push(feetToWidthPosition);
                continue;
            }
            this._zoomList.push(this._getZoom(i));
        }
    }

    private _getItemAnimation(value: 'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed', position: Position, duration: number): ItemAnimation {

        return {
            value,
            params: {
                width: position.width,
                height: position.height,
                offsetLeft: position.offsetLeft,
                offsetTop: position.offsetTop,
                duration
            }
        };
    }
}
