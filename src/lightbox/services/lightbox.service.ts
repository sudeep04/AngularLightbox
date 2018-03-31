import { Injectable } from '@angular/core';

@Injectable()
export class LightboxService {

    private _idIndex: number = 0;

    public generateId(): number {

        return this._idIndex++;
    }

    public addImage(id: number, src: string) {
        
        console.log(id + ':' + src);
    }
}
