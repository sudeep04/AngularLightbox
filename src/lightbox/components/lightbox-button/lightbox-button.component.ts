import { Component, ElementRef } from '@angular/core';
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
                style({ backgroundColor: 'rgba(255, 255, 255, 0.2)' })),
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
        '[@hoverAnimator]': '_hoverAnimator',
        '(mouseenter)': '_onMouseEnter()',
        '(mouseleave)': '_onMouseLeave()'
    }
})
export class LightboxButtonComponent {

    private _isIconButton: boolean = this._hasHostAttributes('lightbox-icon-button');

    private _hoverAnimator: 'leave' | 'enter' = 'leave';

    constructor(
        private _elementRef: ElementRef
    ) {
        for (const attr of BUTTON_HOST_ATTRIBUTES) {
            if (this._hasHostAttributes(attr)) {
                (_elementRef.nativeElement as HTMLElement).classList.add(attr);
            }
        }
    }

    private _onMouseEnter() {

        this._hoverAnimator = 'enter';
    }

    private _onMouseLeave() {

        this._hoverAnimator = 'leave';
    }

    private _getHostElement() {
        return this._elementRef.nativeElement;
    }

    private _hasHostAttributes(...attributes: string[]) {
        return attributes.some((attribute) => this._getHostElement().hasAttribute(attribute));
    }
}
