declare namespace Lightbox {

    interface OpenItemAnimatorState {
        value: 'top' | 'origen';
        params?: {
            width: number;
            height: number;
            offsetTop: number;
            offsetLeft: number;
        };
    }
}
