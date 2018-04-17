import { Position } from './position.interface';

export interface ImgAnimatorState {
    value: 'null' | 'origin' | 'center' | 'right' | 'left';
    params?: Position;
}
