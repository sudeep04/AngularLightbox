export interface ThumbnailSliceAnimatorState {
    value: 'slice' | 'slicing' | 'sliced';
    params?: {
        top: number;
    };
}
