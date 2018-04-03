declare namespace Lightbox {

    interface LightboxItem {

        id: number;
        title: string;
        type: 'img' | 'video';
        url: string;
        original: {
            width: number;
            height: number;
        };
        actual: {
            width: number;
            height: number;
            offsetTop: number;
            offsetLeft: number;
        };
    }
}
