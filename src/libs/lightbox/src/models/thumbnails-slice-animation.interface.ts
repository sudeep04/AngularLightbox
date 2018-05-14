export interface ThumbnailsSliceAnimation {
    value: 'slice' | 'slicing' | 'sliced';
    params?: {
        top: number;
        left: number;
        duration: number;
    };
}
