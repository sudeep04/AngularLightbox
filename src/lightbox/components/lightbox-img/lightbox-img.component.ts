import { Component, Input, Output, EventEmitter, OnChanges, OnInit, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LightboxItemComponent } from '../../models/lightbox-item-component';

@Component({
    selector: 'lightbox-img',
    templateUrl: './lightbox-img.component.html',
    styleUrls: ['./lightbox-img.component.scss'],
    animations: [
        trigger('positionAnimator', [
            state('void',
                style({ visibility: 'hidden' })),
            state('origin',
                style({ visibility: '{{visibility}}', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600, visibility: 'visible' } }),
            state('left',
                style({ visibility: '{{visibility}}', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600, visibility: 'hidden' } }),
            state('right',
                style({ visibility: '{{visibility}}', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600, visibility: 'hidden' } }),
            state('center',
                style({ visibility: '{{visibility}}', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600, visibility: 'visible' } }),
            transition('origin => center', [
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
    ]
})
export class LightboxImgComponent implements OnInit, LightboxItemComponent {

    @Input() public item: Lightbox.LightboxItem;

    @Output() public clickEvent = new EventEmitter();

    public positionAnimator: Lightbox.ItemAnimatorState = { value: 'void' };

    private _animationStart: BehaviorSubject<string> = new BehaviorSubject<string>('void');

    private _animationDone: BehaviorSubject<string> = new BehaviorSubject<string>('void');

    public ngOnInit() {

        this.item.actual = {
            width: this.item.original.width,
            height: this.item.original.height,
            offsetTop: this.item.original.offsetTop,
            offsetLeft: this.item.original.offsetLeft,
            visibility: 'hidden'
        };

        this._changePosition(this.item.position);
    }

    public changePosition(position: 'origin' | 'center' | 'right' | 'left') {

        this.item.position = position;
        this._changePosition(this.item.position);
    }

    public startPositionAnimator(event: AnimationEvent) {

        this._animationStart.next(event.toState);
    }

    public donePositionAnimator(event: AnimationEvent) {

        this._animationDone.next(event.toState);
    }

    public onClick() {

        this.clickEvent.emit();
    }

    @HostListener('window:resize', ['$event'])
    private _onResize(event) {

        this._changePosition(this.item.position);
    }

    private _changePosition(position: 'origin' | 'center' | 'right' | 'left') {

        switch (position) {
            case 'origin': this._setOriginalPosition(); break;
            case 'center': this._setCenterPosition(); break;
            case 'left': this._setLeftPosition(); break;
            case 'right': this._setRightPosition(); break;
        }
    }

    private _setOriginalPosition() {

        this.item.actual = {
            width: this.item.original.width,
            height: this.item.original.height,
            offsetTop: this.item.original.offsetTop,
            offsetLeft: this.item.original.offsetLeft,
            visibility: 'visible'
        };

        this._actualizePosition('origin');
    }

    private _setCenterPosition() {

        this._setDefaultDimensions();

        this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
        this.item.actual.offsetLeft = Math.round((window.innerWidth - this.item.actual.width) / 2);
        this.item.actual.visibility = 'visible';

        this._actualizePosition('center');
    }

    private _setRightPosition() {
        this._setDefaultDimensions();

        this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
        if (this.item.actual.width > window.innerWidth) {
            this.item.actual.offsetLeft = this.item.actual.width;
        } else {
            this.item.actual.offsetLeft = window.innerWidth;
        }

        this.item.actual.visibility = 'hidden';

        this._actualizePosition('right');
    }

    private _setLeftPosition() {

        this._setDefaultDimensions();

        this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
        if (this.item.actual.width > window.innerWidth) {
            this.item.actual.offsetLeft = this.item.actual.width * -1;
        } else {
            this.item.actual.offsetLeft = window.innerWidth * -1;
        }

        this.item.actual.visibility = 'hidden';

        this._actualizePosition('left');
    }

    private _actualizePosition(value: 'void' | 'origin' | 'center' | 'right' | 'left') {

        this.positionAnimator = {
            value,
            params: {
                width: this.item.actual.width,
                height: this.item.actual.height,
                offsetTop: this.item.actual.offsetTop,
                offsetLeft: this.item.actual.offsetLeft,
                visibility: this.item.actual.visibility
            }
        };
    }

    private _setDefaultDimensions() {

        const maxWidth = window.innerWidth * 2 / 3;
        const maxHeight = window.innerHeight * 3 / 4;

        if (this.item.original.width / maxWidth > this.item.original.height / maxHeight) {
            this.item.actual.height = Math.round(maxWidth / this.item.original.width * this.item.original.height);
            this.item.actual.width = Math.round(maxWidth);
        } else {
            this.item.actual.width = Math.round(maxHeight / this.item.original.height * this.item.original.width);
            this.item.actual.height = Math.round(maxHeight);
        }
    }
}
