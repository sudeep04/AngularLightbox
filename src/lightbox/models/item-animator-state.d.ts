declare namespace Lightbox {

    interface ItemAnimatorState {
        value: 'void' | 'visible' | 'animating';
        params?: {
            width: number;
            height: number;
            offsetTop: number;
            offsetLeft: number;
        };
    }
}
