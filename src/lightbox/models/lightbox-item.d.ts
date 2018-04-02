declare namespace Lightbox {

    interface LightboxItem {

        id: number;
        title: string;
        type: 'img' | 'video';
        url: string;
        originalWidth: number;
        originalHeight: number;
        width?: number;
        height?: number;
        offsetTop?: number;
        offsetLeft?: number;
    }
}
