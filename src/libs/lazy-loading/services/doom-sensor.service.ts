import { Injectable } from '@angular/core';
import { TrackedProperties } from '../models/tracked-properties.interface';
import { TrackedItem } from '../models/tracked-item.interface';
import { TrackedItemState } from '../models/tacked-item-state.interface';

@Injectable()
export class DoomSensorService {

    private _trackedItems: TrackedItem[] = [];

    private _trackInterval: any;

    constructor() {

        this._trackInterval = setInterval(this._testList, 20);
    }

    public track(nativeElement: any, trackedProperties: TrackedProperties, callBack: () => void ): void {

        if (this._trackedItems.find((item) => item.nativeElement === nativeElement)) {

            throw new Error('Duplicate tracked element');
        }

        if (trackedProperties.width || trackedProperties.height || trackedProperties.top || trackedProperties.left) {

            const trackedItem: TrackedItem = {
                nativeElement,
                lastState: this._getState(nativeElement, trackedProperties),
                trackedProperties,
                callBack
            };

            this._trackedItems.push(trackedItem);
        }
    }

    public untrack(nativeElement: any): void {

        const trackedItem = this._trackedItems.find((item) => item.nativeElement === nativeElement);

        if (!trackedItem) {
            throw new Error('tracked item not found');
        }

        const index = this._trackedItems.indexOf(trackedItem);

        this._trackedItems.splice(index, 1);
    }

    private _testList = () => {

        this._trackedItems.forEach((item) => {

            this._testItem(item);
        });
    }

    private _testItem(trackedItem: TrackedItem): void {

        const currentState = this._getState(trackedItem.nativeElement, trackedItem.trackedProperties);

        if (trackedItem.lastState.width !== currentState.width ||
            trackedItem.lastState.height !== currentState.height ||
            trackedItem.lastState.top !== currentState.top ||
            trackedItem.lastState.left !== currentState.left) {

            trackedItem.lastState = currentState;
            trackedItem.callBack();
        }
    }

    private _getState(nativeElement: any, trackedProperties: TrackedProperties): TrackedItemState {

        const trackedItemState: TrackedItemState = {};

        if (trackedProperties.width) {

            trackedItemState.width = nativeElement.clientWidth;
        }

        if (trackedProperties.height) {

            trackedItemState.height = nativeElement.clientHeight;
        }

        if (trackedProperties.top) {

            trackedItemState.top = Math.round(nativeElement.getBoundingClientRect().top);
        }

        if (trackedProperties.left) {

            trackedItemState.left = Math.round(nativeElement.getBoundingClientRect().left);
        }

        return trackedItemState;
    }
}
