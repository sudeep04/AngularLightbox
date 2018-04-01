import { Component, HostBinding } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/core';

@Component({
    selector: 'lightbox-panel',
    templateUrl: './lightbox-panel.component.html',
    styleUrls: ['./lightbox-panel.component.scss'],
    animations: [
        trigger('hideShowAnimator', [
            state('true' , style({ opacity: 1 })),
            state('false', style({ opacity: 0 })),
            transition('0 => 1', animate('.5s')),
            transition('1 => 0', animate('.9s'))
        ])
      ]
})
export class LightboxPanelComponent {

    private _items: Lightbox.LightboxItem[] = [];

    @HostBinding('style.pointer-events') private _pointerEvents: string = 'none';

    @HostBinding('@hideShowAnimator') private _hideShowAnimator: boolean = false;

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this._pointerEvents = 'auto';
        this._items = items;
        this._hideShowAnimator = true;
    }

    public close() {

        this._pointerEvents = 'none';
        this._items = [];
        this._hideShowAnimator = false;
    }
}
