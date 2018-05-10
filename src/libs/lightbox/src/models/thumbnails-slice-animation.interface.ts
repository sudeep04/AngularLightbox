export interface ThumbnailsSliceAnimation {
    value: 'slice' | 'slicing' | 'sliced';
    params?: {
        top: number;
        duration: number;
    };
}
