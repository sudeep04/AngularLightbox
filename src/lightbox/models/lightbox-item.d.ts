declare module Lightbox {

    interface LightboxItem {

        id: number;
        type: 'img' | 'video';
        url: string;
    }
}