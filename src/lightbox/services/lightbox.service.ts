import { Injectable} from '@angular/core';
import { DoomService } from './doom.service';
import { Item } from '../models/item';
import { IPosition } from '../models/iPosition';

@Injectable()
export class LightboxService {

    constructor(
        private readonly _doomService: DoomService
    ) {}

    public addItem(item: Item): void {
        
        this._doomService.lightboxComponentRef.instance.addItem(item);
    }

    public openItem(item: Item, position: IPosition): void {

        this._doomService.lightboxComponentRef.instance.openItem(item, position);
    }

    public removeItem(item: Item): void {

        this._doomService.lightboxComponentRef.instance.removeItem(item);
    }
}
