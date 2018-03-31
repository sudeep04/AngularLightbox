import { Injectable } from '@angular/core';

@Injectable()
export class LightboxService {

    private _idIndex: number = 0;
    private _items: { [id: number] : Lightbox.LightboxItem; } = {};

    public generateId(): number {

        return this._idIndex++;
    }

    public addImage(id: number, url: string) {

        this._items[id] = { id:id, type:'img', url:url }
        console.log(this._items[id]);
    }

    public openImage() {

    }
}
