import { IPosition } from './iPosition';

export interface IImgAnimatorState {
    value: 'null' | 'origin' | 'center' | 'right' | 'left';
    params?: IPosition;
}
