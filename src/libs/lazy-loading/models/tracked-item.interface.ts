import { TrackedItemState } from './tacked-item-state.interface';
import { TrackedProperties } from './tracked-properties.interface';

export interface TrackedItem {
    nativeElement: any;
    lastState: TrackedItemState;
    trackedProperties: TrackedProperties;
    callBack: () => void;
}
