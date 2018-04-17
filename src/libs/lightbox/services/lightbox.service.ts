import { Injectable } from '@angular/core';
import { DoomService } from './doom.service';
import { Item } from '../models/item';
import { Position } from '../models/position.interface';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

@Injectable()
export class LightboxService {

    constructor(
        private readonly _doomService: DoomService
    ) { }

    public addItem(item: Item): void {

        this._doomService.lightboxComponentRef.instance.addItem(item);
    }

    public openItem(item: Item, position: Position): void {

        this._doomService.lightboxComponentRef.instance.openItem(item, position);
    }

    public removeItem(item: Item): void {

        this._doomService.lightboxComponentRef.instance.removeItem(item);
    }

    public onClose(func: () => void) {

        this._doomService.lightboxComponentRef.instance.state.filter((state) => state === 'closed').first().subscribe(() => {

            func();
        });
    }
}
