import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'lightbox-img',
    templateUrl: './lightbox-img.component.html',
    styleUrls: ['./lightbox-img.component.scss'],
    animations: [
        trigger('positionAnimator', [
            state('void',
                style({ visibility: 'hidden' })),
            state('visible',
                style({ visibility: '{{visibility}}', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600, visibility: 'visible' } }),
            state('animating',
                style({ visibility: '{{visibility}}', top: '{{offsetTop}}px', left: '{{offsetLeft}}px', width: '{{width}}px', height: '{{height}}px' }),
                { params: { offsetLeft: 200, offsetTop: 200, width: 400, height: 600, visibility: 'visible' } }),
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

    private _animationStart: BehaviorSubject<string> = new BehaviorSubject<string>('void');

    private _animationDone: BehaviorSubject<string> = new BehaviorSubject<string>('void');

    public get $animationStart(): Observable<string> {

        return this._animationStart.asObservable();
    }

    public get $animationDone(): Observable<string> {

        return this._animationDone.asObservable();
    }

    public initOnCenter() {

        this._animate(() => {

            this._actualizePosition('animating', 'visible');
        });
    }

    public initOnLeft() {

        this._setDefaultDimensions();

        this._animate(() => {

            this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
            this.item.actual.offsetLeft = window.innerWidth * -1;
            this._actualizePosition('animating', 'hidden');
        });
    }

    public initOnRight() {

        this._setDefaultDimensions();

        this._animate(() => {
            this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
            this.item.actual.offsetLeft = window.innerWidth;
            this._actualizePosition('animating', 'hidden');
        });
    }

    public sliceLeft() {

        this._animate(() => {
            this.item.actual.offsetLeft = window.innerWidth * -1;
            this._actualizePosition('animating', 'hidden');
        });
    }

    public sliceRight() {

        this._animate(() => {
            this.item.actual.offsetLeft = window.innerWidth;
            this._actualizePosition('animating', 'hidden');
        });
    }

    public zoomIn() {
        // Not yet
    }

    public zoomOut() {
        // Not yet
    }

    public zoomDefault() {

        this._setDefaultDimensions();

        this._animate(() => {
            this.item.actual.offsetTop = Math.round((window.innerHeight - this.item.actual.height) / 2);
            this.item.actual.offsetLeft = Math.round((window.innerWidth - this.item.actual.width) / 2);
            this._actualizePosition('animating', 'visible');
        });
    }

    private _startPositionAnimator(event: AnimationEvent) {

        this._animationStart.next(event.toState);
    }

    private _donePositionAnimator(event: AnimationEvent) {

        if (event.toState === 'animating') {
            this._actualizePosition('visible', this._positionAnimator.params.visibility);
        }
        this._animationDone.next(event.toState);
    }

    private _actualizePosition(value: 'void' | 'visible' | 'animating', visibility: 'hidden' | 'visible') {

        this._positionAnimator = {
            value,
            params: {
                width: this.item.actual.width,
                height: this.item.actual.height,
                offsetTop: this.item.actual.offsetTop,
                offsetLeft: this.item.actual.offsetLeft,
                visibility
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

    private _animate(func: () => void) {

        if (this._positionAnimator.value !== 'animating') {
            func();
        } else {
            this._actualizePosition('visible', 'visible');
            const subscription = this.$animationDone.skip(1).subscribe((animationState) => {
                if (animationState === 'visible') {
                    func();
                    subscription.unsubscribe();
                }
            });
        }
    }

    private _onClick() {

        this.clickEvent.emit();
    }
}
