declare namespace Lightbox {

    interface LightboxItem {

        id: number;
        title: string;
        type: 'img' | 'video';
        url: string;
    }
}
