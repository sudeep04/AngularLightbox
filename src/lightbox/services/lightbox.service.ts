import { Injectable} from '@angular/core';
import { DoomService } from './doom.service';
import { Item } from '../models/item';
import { IPosition } from '../models/iPosition';

@Injectable()
export class LightboxService {

    constructor(
        private readonly _doomService: DoomService
    ) {}

    public addItem(item: Item, container: string): void {
        
        this._doomService.lightboxComponentRef.instance.addItem(item, container);
    }

    public openItem(position: IPosition): void {

        this._doomService.lightboxComponentRef.instance.openItem(position);
    }

    public removeItem(item: Item): void {

        this._doomService.lightboxComponentRef.instance.removeItem(item);
    }
}
