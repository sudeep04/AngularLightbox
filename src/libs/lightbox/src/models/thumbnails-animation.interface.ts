export interface ThumbnailsAnimation {
    value: 'animated' | 'animating';
    params?: {
        maxWidth: number;
        duration: number;
    };
}
