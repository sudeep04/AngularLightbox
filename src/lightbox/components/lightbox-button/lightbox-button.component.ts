import { Component, ElementRef } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

const BUTTON_HOST_ATTRIBUTES = [
    'lightbox-button',
    'lightbox-icon-button'
  ];

@Component({
    selector: 'button[lightbox-button], button[lightbox-icon-button]',
    templateUrl: './lightbox-button.component.html',
    styleUrls: ['./lightbox-button.component.scss']
})
export class LightboxButtonComponent {

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

    private _getHostElement() {
        return this._elementRef.nativeElement;
    }

    private _hasHostAttributes(...attributes: string[]) {
    return attributes.some((attribute) => this._getHostElement().hasAttribute(attribute));
    }
}
