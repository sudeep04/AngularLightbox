import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';

@Component({
    selector: 'lightbox-img',
    templateUrl: './lightbox-img.component.html',
    styleUrls: ['./lightbox-img.component.scss'],
    animations: [
        trigger('positionAnimator', [
            state('void',
                style({ visibility: 'hidden' })),
            state('visible',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600 } }),
            state('animating',
                style({ visibility: 'visible', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600 } }),
            transition('visible => animating', [
                animate('.2s')
            ])
        ])
    ]
})
export class LightboxImgComponent {

    @Input() public item: Lightbox.LightboxItem;
    @Output() public clickEvent = new EventEmitter();

    private _positionAnimator: Lightbox.ItemAnimatorState = { value: 'void' };

    public initFromCenter() {

        this._actualizePosition('visible');
    }

    public initFromLeft() {

        const maxWidth = window.innerWidth * 2 / 3;
        const maxHeight = window.innerHeight * 3 / 4;

        if (this.item.original.width / maxWidth > this.item.original.height / maxHeight) {
            this.item.actual.height = Math.round(maxWidth / this.item.original.width * this.item.original.height);
            this.item.actual.width = Math.round(maxWidth);
        } else {
            this.item.actual.width = Math.round(maxHeight / this.item.original.height * this.item.original.width);
            this.item.actual.height = Math.round(maxHeight);
        }

        this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
        this.item.actual.offsetLeft = window.innerWidth * -1;

        this._actualizePosition('visible');
    }

    public initFromRight() {

        const maxWidth = window.innerWidth * 2 / 3;
        const maxHeight = window.innerHeight * 3 / 4;

        if (this.item.original.width / maxWidth > this.item.original.height / maxHeight) {
            this.item.actual.height = Math.round(maxWidth / this.item.original.width * this.item.original.height);
            this.item.actual.width = Math.round(maxWidth);
        } else {
            this.item.actual.width = Math.round(maxHeight / this.item.original.height * this.item.original.width);
            this.item.actual.height = Math.round(maxHeight);
        }

        this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
        this.item.actual.offsetLeft = window.innerWidth;

        this._actualizePosition('visible');
    }

    public sliceLeft() {

        this.item.actual.offsetLeft = window.innerWidth * -1;

        this._actualizePosition('animating');
    }

    public sliceRight() {

        this.item.actual.offsetLeft = window.innerWidth;

        this._actualizePosition('animating');
    }

    public zoomIn() {
        // Not yet
    }

    public zoomOut() {
        // Not yet
    }

    public zoomDefault() {
        // Not yet
    }

    private _startPositionAnimator(event: AnimationEvent) {
        // Not yet
    }

    private _donePositionAnimator(event: AnimationEvent) {

        if (event.toState === 'animating') {
            this._actualizePosition('visible');
        }
        if (event.fromState === 'void' && event.toState === 'visible') {

            const maxWidth = window.innerWidth * 2 / 3;
            const maxHeight = window.innerHeight * 3 / 4;

            if (this.item.original.width / maxWidth > this.item.original.height / maxHeight) {
                this.item.actual.height = Math.round(maxWidth / this.item.original.width * this.item.original.height);
                this.item.actual.width = Math.round(maxWidth);
            } else {
                this.item.actual.width = Math.round(maxHeight / this.item.original.height * this.item.original.width);
                this.item.actual.height = Math.round(maxHeight);
            }

            this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
            this.item.actual.offsetLeft = Math.round((window.innerWidth - this.item.actual.width) / 2);

            this._actualizePosition('animating');
        }
    }

    private _actualizePosition(value: 'void' | 'visible' | 'animating') {

        this._positionAnimator = {
            value,
            params: {
                width: this.item.actual.width,
                height: this.item.actual.height,
                offsetTop: this.item.actual.offsetTop,
                offsetLeft: this.item.actual.offsetLeft
            }
        };
    }

    private _onClick() {

        this.clickEvent.emit();
    }
}
