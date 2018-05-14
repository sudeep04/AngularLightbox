export interface ThumbnailsAnimation {
    value: 'animated' | 'animating';
    params?: {
        maxWidth: number;
        maxHeight: number;
        duration: number;
    };
}
