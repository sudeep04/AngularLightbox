import { AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IImgAnimatorState } from './iImgAnimatorState';
import { IPosition } from './iPosition';
import { ElementRef } from '@angular/core';
import { IHostAnimatorState } from './iHosAnimatorState';
import { IAnimatorCallback } from './iAnimatorCallback';
import 'rxjs/add/operator/filter';

export class ItemAnimator {

    private _itemAnimatorStart: BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'> = new BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'>('null');
    
    private _itemAnimatorDone: BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'> = new BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'>('null');

    private _hostAnimatorStart: BehaviorSubject<'null' | 'fixed'> = new BehaviorSubject<'null' | 'fixed'>('null');
    
    private _hostAnimatorDone: BehaviorSubject<'null' | 'fixed'> = new BehaviorSubject<'null' | 'fixed'>('null');

    protected _loaded: boolean = false;

    private _centerPosition: IPosition;

    private _leftPosition: IPosition;

    private _rightPosition: IPosition;

    private _hostPosition: IPosition;

    public itemAnimator: IImgAnimatorState = { value: 'null' };

    public hostAnimator: IHostAnimatorState = { value: 'null' };

    constructor(
        private readonly _element: ElementRef,
    ) {}

    public load(): void {

        if(!this._loaded) {

            this._hostPosition = {
                width: this._element.nativeElement.clientWidth,
                height: this._element.nativeElement.clientHeight,
                offsetTop: Math.round(this._element.nativeElement.getBoundingClientRect().top),
                offsetLeft: Math.round(this._element.nativeElement.getBoundingClientRect().left)
            }
    
            const maxWidth = window.innerWidth * 2 / 3;
            const maxHeight = window.innerHeight * 3 / 4;
            
            let height: number;
            let width: number;
            let offsetTop: number;
            let offsetLeft: number;
    
            if (this._hostPosition.width / maxWidth > this._hostPosition.height / maxHeight) {
                height = Math.round(maxWidth / this._hostPosition.width * this._hostPosition.height);
                width = Math.round(maxWidth);
            } else {
                width = Math.round(maxHeight / this._hostPosition.height * this._hostPosition.width);
                height = Math.round(maxHeight);
            }
    
            offsetTop = Math.round((window.innerHeight - height) / 2);
            offsetLeft = Math.round((window.innerWidth - width) / 2);
            
            this._centerPosition = {width, height, offsetTop, offsetLeft};
    
            if (this._centerPosition.width > window.innerWidth) {
                offsetLeft = this._centerPosition.width * -1;
            } else {
                offsetLeft = window.innerWidth * -1;
            }
    
            this._leftPosition = { width, height, offsetTop: this._centerPosition.offsetTop, offsetLeft: offsetLeft };
    
            if (this._centerPosition.width > window.innerWidth) {
                offsetLeft = this._centerPosition.width;
            } else {
                offsetLeft = window.innerWidth;
            }
    
            this._rightPosition = { width, height, offsetTop: this._centerPosition.offsetTop, offsetLeft: offsetLeft };

            this._loaded = true;
        }
    }

    public itemAnimatorStart(event: AnimationEvent): void {

        this._itemAnimatorStart.next(event.fromState as 'null' | 'origin' | 'center' | 'left' | 'right');
    }
    
    public itemAnimatorDone(event: AnimationEvent): void {

        this._itemAnimatorDone.next(event.toState as 'null' | 'origin' | 'center' | 'left' | 'right');
    }

    public hostAnimatorStart(event: AnimationEvent): void {

        this._hostAnimatorStart.next(event.fromState as 'null' | 'fixed');
    }
    
    public hostAnimatorDone(event: AnimationEvent): void {

        this._hostAnimatorDone.next(event.toState as 'null' | 'fixed');
    }

    /* Item animations  */

    public animateNull(): IAnimatorCallback {

        this.itemAnimator = { value: 'null' };
        return this._itemAnimatorCallBack('null');
    }

    public animateOrigin(): IAnimatorCallback {
        
        this.itemAnimator = { value: 'origin', params: this._hostPosition };
        return this._itemAnimatorCallBack('origin');
    }

    public animateCenter(): IAnimatorCallback {
        
        this.itemAnimator = { value: 'center', params: this._centerPosition };
        return this._itemAnimatorCallBack('center');
    }

    public animateLeft(position: IPosition): IAnimatorCallback {
        
        this.itemAnimator = { value: 'left', params: position };
        return this._itemAnimatorCallBack('left');
    }

    public animateRight(position: IPosition): IAnimatorCallback {
        
        this.itemAnimator = { value: 'right', params: position };
        return this._itemAnimatorCallBack('right');
    }

    /*  Host animations  */

    public animateHostNull(): IAnimatorCallback {

        this.hostAnimator = { value: 'null' };
        return this._hostAnimatorCallBack('null');
    }

    public animateHostFixed(): IAnimatorCallback {

        this.hostAnimator = { value: 'fixed', params: { width: this._hostPosition.width, height: this._hostPosition.height } };
        return this._hostAnimatorCallBack('fixed');
    }

    private _itemAnimatorCallBack(state: 'null' | 'origin' | 'center' | 'left' | 'right'): IAnimatorCallback{
        return  { 
            start :(func: () => void) => {
                const s = this._itemAnimatorStart.filter((value)=> value == state).subscribe(()=>{
                    func();
                    s.unsubscribe();
                })
            },
            done :(func: () => void) => {
                const s = this._itemAnimatorDone.filter((value)=> value == state).subscribe(()=>{
                    func();
                    s.unsubscribe();
                })
            }
        }
    }

    private _hostAnimatorCallBack(state: 'null' | 'fixed'): IAnimatorCallback{
        return  { 
            start :(func: () => void) => {
                const s = this._hostAnimatorStart.filter((value)=> value == state).subscribe(()=>{
                    func();
                    s.unsubscribe();
                })
            },
            done :(func: () => void) => {
                const s = this._hostAnimatorDone.filter((value)=> value == state).subscribe(()=>{
                    func();
                    s.unsubscribe();
                })
            }
        }
    }
}