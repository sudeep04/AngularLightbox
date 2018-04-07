import { Injectable} from '@angular/core';
import { ILightboxItemComponent } from '../models/iLightboxItemComponent';
import { LightboxComponent } from '../components/lightbox/lightbox.component';
import { DoomService } from './doom.service';
import { Item } from '../models/item';

@Injectable()
export class LightboxService {

    constructor(
        private readonly _doomService: DoomService
    ) {}

    public addItem(item: Item, container: string): void {
        
        this._doomService.lightboxComponentRef.instance.addItem(item, container);
    }

    public removeItem(item: Item) {

        this._doomService.lightboxComponentRef.instance.removeItem(item);
    }
}
