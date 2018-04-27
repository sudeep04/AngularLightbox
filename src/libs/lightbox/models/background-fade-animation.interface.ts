export interface BackgroundFadeAnimation {
    value: 'hidden' | 'visible';
    params?: {
        duration: number;
        opacity: number;
    };
}
