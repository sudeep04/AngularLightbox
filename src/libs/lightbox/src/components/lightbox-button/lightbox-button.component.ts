import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

const BUTTON_HOST_ATTRIBUTES = [
    'lightbox-button',
    'lightbox-icon-button'
];

@Component({
    selector: 'button[lightbox-button], button[lightbox-icon-button]',
    templateUrl: 'lightbox-button.component.html',
    styleUrls: ['lightbox-button.component.scss'],
    animations: [
        trigger('hoverAnimation', [
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
        ])
    ],
    host: {
        '(mouseenter)': '_onMouseEnter()',
        '(mouseleave)': '_onMouseLeave()'
    }
})
export class LightboxButtonComponent implements OnChanges {

    @Input() public disable: boolean = false;

    public hoverAnimation: 'leave' | 'enter' = 'leave';

    private _isIconButton: boolean = this._hasHostAttributes('lightbox-icon-button');

    constructor(
        private _elementRef: ElementRef
    ) {
        for (const attr of BUTTON_HOST_ATTRIBUTES) {
            if (this._hasHostAttributes(attr)) {
                (_elementRef.nativeElement as HTMLElement).classList.add(attr);
            }
        }
    }

    public ngOnChanges() {

        if (this.disable) {
            (this._elementRef.nativeElement as HTMLElement).classList.add('disable');
            if (this.hoverAnimation === 'enter') {
                this.hoverAnimation = 'leave';
            }
        } else {
            if ((this._elementRef.nativeElement as HTMLElement).classList.contains('disable')) {
                (this._elementRef.nativeElement as HTMLElement).classList.remove('disable');
            }
        }
    }

    private _onMouseEnter() {

        if (!this.disable) {
            this.hoverAnimation = 'enter';
        }
    }

    private _onMouseLeave() {

        this.hoverAnimation = 'leave';
    }

    private _getHostElement() {
        return this._elementRef.nativeElement;
    }

    private _hasHostAttributes(...attributes: string[]) {
        return attributes.some((attribute) => this._getHostElement().hasAttribute(attribute));
    }
}
