import { ITrackedItemState } from './iTackedItemState';
import { ITrackedProperties } from './iTrackedProperties';

export interface ITrackedItem {
    nativeElement: any;
    lastState: ITrackedItemState;
    trackedProperties: ITrackedProperties;
    callBack: () => void;
}