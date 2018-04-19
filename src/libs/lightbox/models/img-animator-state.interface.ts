import { Position } from './position.interface';

export interface ImgAnimatorState {
    value: 'null' | 'origin' | 'right' | 'left'| 'zoom0' | 'zoom1' | 'zoom2' | 'zoom3' | 'zoom4' | 'zoom5' | 'zoom6' | 'zoom7' | 'zoom8';
    params?: Position;
}
