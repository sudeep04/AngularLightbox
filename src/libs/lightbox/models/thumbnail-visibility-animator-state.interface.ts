export interface ThumbnailVisibilityAnimatorState {
    value: 'hidden' | 'visible';
    params?: {
        maxWidth: number;
    };
}
