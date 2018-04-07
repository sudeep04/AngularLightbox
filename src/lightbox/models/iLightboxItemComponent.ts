import { IAnimatorCallback } from './iAnimatorCallBack';
import { IPosition } from './iPosition';

export interface ILightboxItemComponent {
    container: string;
    animateNull:() => IAnimatorCallback;
    animateOrigin:() => IAnimatorCallback;
    animateCenter:() => IAnimatorCallback;
    animateLeft:(position: IPosition) => IAnimatorCallback;
    animateRight:(position: IPosition) => IAnimatorCallback;
    animateHostNull:() => IAnimatorCallback;
    animateHostFixed:() => IAnimatorCallback;
}
