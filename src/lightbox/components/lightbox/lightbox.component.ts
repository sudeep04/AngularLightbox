import { Component } from '@angular/core';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    exportAs: 'lightbox'
})
export class LightboxComponent {

    private _items: { [id: number]: Lightbox.LightboxItem; } = {};

    public addItem(item: Lightbox.LightboxItem) {

        this._items[item.id] = item;
    }

    public openItem(id: number) {

        console.log(this._items[id]);
        console.log(this._items);
    }
}
