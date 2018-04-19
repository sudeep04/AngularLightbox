
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Item } from '../../models/item';
import { ILightboxItemComponent } from '../../models/iLightboxItemComponent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AnimatorCallback } from '../../models/animator-callBack.interface';
import { ImgAnimatorState } from '../../models/img-animator-state.interface';
import { Position } from '../../models/position.interface';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { Video } from '../../models/video';

@Component({
    selector: 'lightbox-item',
    templateUrl: './lightbox-item.component.html',
    styleUrls: ['./lightbox-item.component.scss'],
    animations: [
        trigger('itemAnimator', [
            state('null', style({ visibility: 'hidden' })),
            state('origin',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('left',
                style({ visibility: 'hidden', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('right',
                style({ visibility: 'hidden', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom0',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom1',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom2',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom3',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom4',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom5',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom6',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom7',
                style({ visibility: 'visible',top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            transition('* => null', [
                animate(0)
            ]),
            transition('null => *', [
                animate(0)
            ]),
            transition('void => *', [
                animate(0)
            ]),
            transition('* => *', [
                animate('.2s')
            ])
        ])
    ],
    host: {
        '(click)': 'onClick($event)'
    }
})
export class LightboxItemComponent implements OnInit {

    @Input('item') public item: Item;

    @Output() public toggleEvent = new EventEmitter();

    public itemAnimator: ImgAnimatorState = { value: 'null' };

    @ViewChild('img') private _img: ElementRef;

    private _isVideo: boolean;

    private _itemAnimatorStart: BehaviorSubject<'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'> = new BehaviorSubject<'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'>('null');

    private _itemAnimatorDone: BehaviorSubject<'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'> = new BehaviorSubject<'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'>('null');

    public ngOnInit(): void {

        this._isVideo = this.item instanceof Video;
    }

    public isVideo(): boolean {

        return this._isVideo;
    }

    public onClick(event: Event): void {

        if (!this._isVideo) {

            this.toggleEvent.emit();
        }
    }

    public itemAnimatorStart(event: AnimationEvent): void {

        this._itemAnimatorStart.next(event.fromState as 'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7');
    }

    public itemAnimatorDone(event: AnimationEvent): void {

        console.log('from ' + event.fromState + ' to ' + event.toState);
        this._itemAnimatorDone.next(event.toState as 'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7');
    }

    public animateNull(): AnimatorCallback {

        this.itemAnimator = { value: 'null' };
        return this._itemAnimatorCallBack('null');
    }

    public animateOrigin(position: Position): AnimatorCallback {

        this.itemAnimator = { value: 'origin', params: position };
        return this._itemAnimatorCallBack('origin');
    }

    public animateCenter(): AnimatorCallback {

        this._initZoom();
        this._position = 0;
        this.itemAnimator = { value: 'zoom0', params: this._getCenterPosition() };
        return this._itemAnimatorCallBack('zoom0');
    }

    public animateLeft(): AnimatorCallback {

        this.itemAnimator = { value: 'left', params: this._getLeftPosition() };
        return this._itemAnimatorCallBack('left');
    }

    public animateRight(): AnimatorCallback {

        this.itemAnimator = { value: 'right', params: this._getRightPosition() };
        return this._itemAnimatorCallBack('right');
    }

    private _itemAnimatorCallBack(itemState: 'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'): AnimatorCallback {
        return {
            start: (func: () => void) => {
                this._itemAnimatorStart.filter((value) => value === itemState).first().subscribe(() => {
                    func();
                });
            },
            done: (func: () => void) => {
                this._itemAnimatorDone.filter((value) => value === itemState).first().subscribe(() => {
                    func();
                });
            }
        };
    }

    private _getCenterPosition(): Position {

        const maxWidth = window.innerWidth * 2 / 3;
        const maxHeight = (window.innerHeight - 128) * 9 / 10;

        let height: number;
        let width: number;
        let offsetTop: number;
        let offsetLeft: number;

        if (this._img.nativeElement.width / maxWidth > this._img.nativeElement.height / maxHeight) {
            height = Math.round(maxWidth / this._img.nativeElement.width * this._img.nativeElement.height);
            width = Math.round(maxWidth);
        } else {
            width = Math.round(maxHeight / this._img.nativeElement.height * this._img.nativeElement.width);
            height = Math.round(maxHeight);
        }

        offsetTop = Math.round((window.innerHeight - height) / 2);
        offsetLeft = Math.round((window.innerWidth - width) / 2);

        return { width, height, offsetTop, offsetLeft };
    }

    private _getFeetToWidthPosition(): Position {

        let height: number;
        let width: number;
        let offsetTop: number;
        let offsetLeft: number;

        height = Math.round(window.innerWidth / this._img.nativeElement.width * this._img.nativeElement.height);
        width = Math.round(window.innerWidth);

        offsetTop = Math.round((window.innerHeight - height) / 2);
        offsetLeft = 0;

        return { width, height, offsetTop, offsetLeft };
    }

    private _getLeftPosition(): Position {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;

        if (centerPosition.width > window.innerWidth) {
            offsetLeft = centerPosition.width * -1;
        } else {
            offsetLeft = window.innerWidth * -1;
        }

        return { width: centerPosition.width, height: centerPosition.height, offsetTop: centerPosition.offsetTop, offsetLeft };
    }

    private _getRightPosition(): Position {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;

        if (centerPosition.width > window.innerWidth) {
            offsetLeft = centerPosition.width;
        } else {
            offsetLeft = window.innerWidth;
        }

        return { width: centerPosition.width, height: centerPosition.height, offsetTop: centerPosition.offsetTop, offsetLeft };
    }

    private _getZoom(zoom: number): Position {

        const step = window.innerWidth * zoom / 6;

        const centerPosition = this._getCenterPosition();

        let height: number;
        let width: number;
        let offsetTop: number;
        let offsetLeft: number;

        height = Math.round((centerPosition.width + step) / this._img.nativeElement.width * this._img.nativeElement.height);
        width = Math.round(centerPosition.width + step);

        offsetTop = Math.round((window.innerHeight - height) / 2);
        offsetLeft = Math.round((window.innerWidth - width) / 2);

        return { width, height, offsetTop, offsetLeft };
    }

    public resize(){
        this._initZoom();
        this.itemAnimator = { value: 'zoom' + this._position, params: this._zoomList[this._position] } as ImgAnimatorState;
    }

    private _initZoom(): void {

        const defaultPosition = this._getCenterPosition();
        const feetToWidthPosition = this._getFeetToWidthPosition();

        this._feetToWidthPosition = Math.round(((feetToWidthPosition.width - defaultPosition.width) / 2) / (window.innerWidth / 12));

        this._zoomList = [];

        for(var i = 0; i < 8; i++) {
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

    public zoomIn(){
        if(this._position + 1 < this._zoomList.length) {
            this._position++;
            this.itemAnimator = { value: 'zoom' + this._position, params: this._zoomList[this._position] } as ImgAnimatorState;
        }
    }

    public zoomOut(){
        if(this._position > 0) {
            this._position--;
            this.itemAnimator = { value: 'zoom' + this._position, params: this._zoomList[this._position] }as ImgAnimatorState;
        }
    }

    public resetZoom(){
        
        this._position = 0;
        this.itemAnimator = { value: 'zoom' + this._position, params: this._zoomList[this._position] } as ImgAnimatorState;
    }

    public feetToWidth(){
        
        this._position = this._feetToWidthPosition;
        this.itemAnimator = { value: 'zoom' + this._position, params: this._zoomList[this._position] } as ImgAnimatorState;
    }

    public get feetToWidthPosition(): number{
        
        return this._feetToWidthPosition;
    }

    public get position(): number{
        
        return this._position;
    }

    public get zoomMax(): number{
        
        return 7;
    }

    private _zoomList = [];

    private _position = 0;

    private _feetToWidthPosition;
}
