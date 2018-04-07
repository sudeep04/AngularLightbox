import { IPosition } from './iPosition';

export interface IHostAnimatorState {
    value: 'null' | 'fixed';
    params?: {
        width: number;
        height: number;
    };
}
