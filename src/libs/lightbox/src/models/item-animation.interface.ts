import { Position } from './position.interface';

export interface ItemAnimation {
    value: 'hidden' | 'origin' | 'center' | 'right' | 'left' | 'zoom' | 'zooming' | 'zoomed';
    params?: {
        width: number;
        height: number;
        offsetTop: number;
        offsetLeft: number;
        duration: number;
    };
}
