import { Component } from '@angular/core';

@Component({
    selector: 'lightbox-panel',
    templateUrl: './lightbox-panel.component.html',
    styleUrls: ['./lightbox-panel.component.scss']
})
export class LightboxPanelComponent {

    private _items: Lightbox.LightboxItem[] = [];

    public open(items: Lightbox.LightboxItem[], activeItem: number) {

        this._items = items;
    }

    public close() {
        
        this._items = [];
    }
}
