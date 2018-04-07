
import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Item } from '../../models/item';
import { ILightboxItemComponent } from '../../models/iLightboxItemComponent';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAnimatorCallback } from '../../models/iAnimatorCallBack';
import { IImgAnimatorState } from '../../models/iImgAnimatorState';
import { IPosition } from '../../models/iPosition';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'lightbox-item',
    templateUrl: './lightbox-item.component.html',
    styleUrls: ['./lightbox-item.component.scss'],
    animations: [
        trigger('itemAnimator', [

            state('null', style({visibility: 'hidden'})),
            state('origin',
                style({ top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('left',
                style({ top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('right',
                style({ top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            state('center',
                style({ top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 0, offsetTop: 0, width: 0, height: 0 } }),
            transition('origin => center', [
                animate('.2s')
            ]),
            transition('center => origin', [
                animate('.2s')
            ]),
            transition('center => left', [
                animate('.2s')
            ]),
            transition('center => right', [
                animate('.2s')
            ]),
            transition('right => center', [
                animate('.2s')
            ]),
            transition('left => center', [
                animate('.2s')
            ])
        ])
    ],
    host:{
        '(click)': 'onClick($event)'
    }
})
export class LightboxItemComponent {

    @Input('item') public item: Item;

    @ViewChild('img') private _img: ElementRef;
    
    @Output() public toggleEvent = new EventEmitter();
    
    public itemAnimator: IImgAnimatorState = { value: 'null' };

    private _itemAnimatorStart: BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'> = new BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'>('null');
    
    private _itemAnimatorDone: BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'> = new BehaviorSubject<'null' | 'origin' | 'center' | 'left' | 'right'>('null');

    public onClick(event: Event): void {
        this.toggleEvent.emit();
    }

    public itemAnimatorStart(event: AnimationEvent): void {

        this._itemAnimatorStart.next(event.fromState as 'null' | 'origin' | 'center' | 'left' | 'right');
    }
    
    public itemAnimatorDone(event: AnimationEvent): void {

        this._itemAnimatorDone.next(event.toState as 'null' | 'origin' | 'center' | 'left' | 'right');
    }

    public animateNull(): IAnimatorCallback {

        this.itemAnimator = { value: 'null' };
        return this._itemAnimatorCallBack('null');
    }

    public animateOrigin(position: IPosition): IAnimatorCallback {
        
        this.itemAnimator = { value: 'origin', params: position };
        return this._itemAnimatorCallBack('origin');
    }

    public animateCenter(): IAnimatorCallback {

        this.itemAnimator = { value: 'center', params: this._getCenterPosition() };
        return this._itemAnimatorCallBack('center');
    }

    public animateLeft(): IAnimatorCallback {
        
        this.itemAnimator = { value: 'left', params: this._getLeftPosition() };
        return this._itemAnimatorCallBack('left');
    }

    public animateRight(): IAnimatorCallback {
        
        this.itemAnimator = { value: 'right', params: this._getRightPosition() };
        return this._itemAnimatorCallBack('right');
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

    private _getCenterPosition(): IPosition {

        const maxWidth = window.innerWidth * 2 / 3;
        const maxHeight = window.innerHeight * 3 / 4;
            
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

        return {width, height, offsetTop, offsetLeft};
    }

    private _getLeftPosition(): IPosition {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;
    
        if (centerPosition.width > window.innerWidth) {
            offsetLeft = centerPosition.width * -1;
        } else {
            offsetLeft = window.innerWidth * -1;
        }
    
        return { width: centerPosition.width, height: centerPosition.height, offsetTop: centerPosition.offsetTop, offsetLeft: offsetLeft };
    }

    private _getRightPosition(): IPosition {

        const centerPosition = this._getCenterPosition();

        let offsetLeft: number;
    
        if (centerPosition.width > window.innerWidth) {
            offsetLeft = centerPosition.width;
        } else {
            offsetLeft = window.innerWidth;
        }
    
        return { width: centerPosition.width, height: centerPosition.height, offsetTop: centerPosition.offsetTop, offsetLeft: offsetLeft };
    }
}
