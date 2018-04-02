import { Component } from '@angular/core';
import { LightboxService } from '../../services/lightbox.service';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    exportAs: 'lightbox'
})
export class LightboxComponent {

    private _items: { [id: number]: Lightbox.LightboxItem; } = {};

    constructor(
        private _lightboxService: LightboxService
    ) {}

    public addItem(item: Lightbox.LightboxItem) {

        this._items[item.id] = item;
    }

    public openItem(id: number, width: number, height: number, offsetTop: number, offsetLeft: number) {

        this._items[id].width = width;
        this._items[id].height = height;
        this._items[id].offsetTop = offsetTop;
        this._items[id].offsetLeft = offsetLeft;
        
        const itemsArray = Object.keys(this._items).map((key) => {
            return this._items[key];
        });

        this._lightboxService.lightboxPanel.open(itemsArray, id);
    }
}
