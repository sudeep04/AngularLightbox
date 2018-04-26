
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter, OnInit, ViewEncapsulation, Optional } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent, query } from '@angular/animations';
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
        trigger('itemAnimatorState', [
            state('null', style({ visibility: 'hidden' })),
            state('void', style({ visibility: 'hidden' })),
            state('origin',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
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
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom2',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom3',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom4',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom5',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom6',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('zoom7',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } })
        ]),
        trigger('hostAnimatorState', [
            state('null', style({ visibility: 'hidden' })),
            state('void', style({ visibility: 'hidden' })),
            state('origin',
                style({ visibility: 'visible' })),
            state('left',
                style({ visibility: 'hidden' })),
            state('right',
                style({ visibility: 'hidden' })),
            state('*',
                style({ visibility: 'visible' }))
        ]),
        trigger('transitions', [
            transition('null => *', [
                query(':self, img', [
                    animate(0)
                ])
            ]),
            transition('void => *', [
                query(':self, img', [
                    animate(0)
                ])
            ]),
            transition('* => null', [
                query(':self, img', [
                    animate(0, style({ visibility: 'hidden'}))
                ])
            ]),
            transition('* => left', [
                query('img', [
                    animate('.4s', style({ visibility: 'hidden', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }))
                ])
            ], { params: { paddingLeft: 0, paddingTop: 0, offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            transition('* => right', [
                query('img', [
                    animate('.4s', style({ visibility: 'hidden', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }))
                ])
            ], { params: { paddingLeft: 0, paddingTop: 0, offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            transition('* => *', [
                query('img', [
                    animate('.4s', style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }))
                ])
            ], { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } })
        ]),
    ],
    host: {
        '[@hostAnimatorState]': 'itemAnimator',
        '[@transitions]': 'itemAnimator',
        '(@transitions.start)': 'itemAnimatorStart($event)',
        '(@transitions.done)': 'itemAnimatorDone($event)',
        '[style.overflow]': 'overflow'
    }
})
export class LightboxItemComponent implements OnInit {

    @Input('item') public item: Item;

    @Output() public toggleEvent = new EventEmitter();

    public itemAnimator: ImgAnimatorState = { value: 'null' };

    @ViewChild('img') private _img: ElementRef;

    public overflow: 'hidden' | 'auto';

    private _isVideo: boolean;

    private _itemAnimatorStart: BehaviorSubject<'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'>
        = new BehaviorSubject<'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'>('null');

    private _itemAnimatorDone: BehaviorSubject<'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'>
        = new BehaviorSubject<'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'>('null');

    private _zoomList: Position[];

    private _position = 0;

    private _feetToWidthPosition;

    constructor(private readonly _elementRef: ElementRef){
        
    }

    public ngOnInit(): void {

        this._isVideo = this.item instanceof Video;
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

    private _scrollInterval: any;

    public itemAnimatorStart(event: AnimationEvent): void {

        // if(event.fromState.substring(0,4) == 'zoom' && event.toState.substring(0,4) == 'zoom') {

        //     this._scrollInterval = setInterval(()=>{

                
        //         const top = (this._img.nativeElement.clientHeight - window.innerHeight) / 2;
        //         const left = (this._img.nativeElement.clientWidth - window.innerWidth) / 2;
            
        //         if(event.fromState < event.toState) {

        //             this._elementRef.nativeElement.scrollTop += Math.round(window.innerHeight/16);
        //             this._elementRef.nativeElement.scrollLeft += Math.round(window.innerWidth/24);
        //         }else{
                    
        //             this._elementRef.nativeElement.scrollTop -= Math.round(window.innerHeight/16);
        //             this._elementRef.nativeElement.scrollLeft -= Math.round(window.innerWidth/24);
        //         }
        //         //this._elementRef.nativeElement.scrollLeft = this._elementRef.nativeElement.offset().top + (this._elementRef.nativeElement.height() / 2);
        //     },0)
        // }
        if(event.toState == 'right' || event.fromState == 'right') {

            this.overflow = 'hidden';
        }
        this._itemAnimatorStart.next(event.fromState as 'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7');
    }

    private _dragPositionX: number;
    private _dragPositionY: number;

    public ondragstart(event){
        this._dragPositionX = event.layerX;
        this._dragPositionY = event.layerY;
    }

    public drag(event){
        console.log(event);
        this._elementRef.nativeElement.scrollTop += this._dragPositionY - event.layerY;
        this._elementRef.nativeElement.scrollLeft += this._dragPositionX - event.layerX;
    }

    public itemAnimatorDone(event: AnimationEvent): void {

        // if(event.fromState.substring(0,4) == 'zoom' && event.toState.substring(0,4) == 'zoom') {

        //     clearInterval(this._scrollInterval);
        // }
        this.overflow = 'auto';
        this._itemAnimatorDone.next(event.toState as 'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7');
    }

    public animateNull(): AnimatorCallback {

        this.itemAnimator = { value: 'null' };
        return this._itemAnimatorCallBack('null');
    }

    public animateOrigin(position: Position): AnimatorCallback {

        position.offsetTop = position.offsetTop - (this._elementRef.nativeElement.clientHeight - position.height) /2;
        position.offsetLeft = position.offsetLeft - (this._elementRef.nativeElement.clientWidth - position.width) /2;

        this.itemAnimator = {
            value: 'origin', params: position
        };

        return this._itemAnimatorCallBack('origin');
    }

    public animateCenter(): AnimatorCallback {

        this._initZoom();
        this._position = 0;
        this.itemAnimator = {
            value: 'zoom0', params: this._getCenterPosition()
        };
        return this._itemAnimatorCallBack('zoom0');
    }

    public animateLeft(): AnimatorCallback {

        this.itemAnimator = {
            value: 'left', params: this._getLeftPosition()
        };

        return this._itemAnimatorCallBack('left');
    }

    public animateRight(): AnimatorCallback {

        this.itemAnimator = {
            value: 'right', params: this._getRightPosition()
        };

        return this._itemAnimatorCallBack('right');
    }

    public zoomIn(): void {

        if (this._position + 1 < this._zoomList.length) {

            this._position++;
            this._animatePosition(this._position);
        }
    }

    public zoomOut(): void {

        if (this._position > 0) {

            this._position--;
            this._animatePosition(this._position);
        }
    }

    public resetZoom(): void {

        this._position = 0;
        this._animatePosition(this._position);
    }

    public feetToWidth(): void {

        this._position = this._feetToWidthPosition;
        this._animatePosition(this._position);
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
        this._animatePosition(this._position);
    }

    private _animatePosition(position: number) {
        
        this.itemAnimator = {
            value: 'zoom' + position, params: this._zoomList[position]
        } as ImgAnimatorState;
    }

    private _itemAnimatorCallBack(itemState: 'null' | 'origin' | 'right' | 'left' | 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7'): AnimatorCallback {
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
        let offsetTop: number;
        let offsetLeft: number;

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

    private _getRightPosition(): Position {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;

        if (centerPosition.width >this._elementRef.nativeElement.clientWidth) {
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
}
