import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

const BUTTON_HOST_ATTRIBUTES = [
    'lightbox-button',
    'lightbox-icon-button'
];

@Component({
    selector: 'button[lightbox-button], button[lightbox-icon-button]',
    templateUrl: './lightbox-button.component.html',
    styleUrls: ['./lightbox-button.component.scss'],
    animations: [
        trigger('hoverAnimator', [
            state('enter',
                style({ backgroundColor: 'rgba(255, 255, 255, 0.3)' })),
            state('leave',
                style({ backgroundColor: 'rgba(255, 255, 255, 0)' })),
            transition('leave => enter', [
                animate('.1s')
            ]),
            transition('enter => leave', [
                animate('.1s')
            ])
        ]),
        trigger('displayAnimator', [
            state('hideLeft', style({ left: '-80px', right: '0px' })),
            state('hideRight', style({ left: '120px', right: '0px' })),
            state('show', style({ left: '0px', right: '0px' })),
            transition('show => hideLeft', [
                animate('.05s')
            ]),
            transition('show => hideRight', [
                animate('.05s')
            ]),
            transition('hideRight => show', [
                animate('.2s')
            ]),
            transition('hideLeft => show', [
                animate('.2s')
            ])
        ])
    ],
    host: {
        '[@displayAnimator]': '_displayAnimator',
        '(mouseenter)': '_onMouseEnter()',
        '(mouseleave)': '_onMouseLeave()'
    }
})
export class LightboxButtonComponent implements OnChanges, OnInit {

    @Input() public disable: boolean = false;

    @Input() public position: 'left' | 'right';

    public hoverAnimator: 'leave' | 'enter' = 'leave';

    private _isIconButton: boolean = this._hasHostAttributes('lightbox-icon-button');

    private _displayAnimator: 'hideLeft' | 'hideRight' | 'show' = 'show';

    constructor(
        private _elementRef: ElementRef
    ) {
        for (const attr of BUTTON_HOST_ATTRIBUTES) {
            if (this._hasHostAttributes(attr)) {
                (_elementRef.nativeElement as HTMLElement).classList.add(attr);
            }
        }
    }

    public ngOnInit() {

        if (this.position) {
            this.hide();
        }
    }

    public show() {

        this._displayAnimator = 'show';
    }

    public hide() {

        if (this.position === 'left') {

            this._displayAnimator = 'hideLeft';
        } else {
            this._displayAnimator = 'hideRight';

        }
    }

    public ngOnChanges() {

        if (this.disable) {
            (this._elementRef.nativeElement as HTMLElement).classList.add('disable');
            if (this.hoverAnimator === 'enter') {
                this.hoverAnimator = 'leave';
            }
        } else {
            if ((this._elementRef.nativeElement as HTMLElement).classList.contains('disable')) {
                (this._elementRef.nativeElement as HTMLElement).classList.remove('disable');
            }
        }
    }

    private _onMouseEnter() {

        if (!this.disable) {
            this.hoverAnimator = 'enter';
        }
    }

    private _onMouseLeave() {

        this.hoverAnimator = 'leave';
    }

    private _getHostElement() {
        return this._elementRef.nativeElement;
    }

    private _hasHostAttributes(...attributes: string[]) {
        return attributes.some((attribute) => this._getHostElement().hasAttribute(attribute));
    }
}
