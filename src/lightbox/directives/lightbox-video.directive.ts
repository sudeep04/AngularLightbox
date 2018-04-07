// import { Directive, OnInit, ElementRef, Input } from '@angular/core';
// import { LightboxService } from '../../services/lightbox.service';
// import { Video } from '../../models/video';
// import { ItemDirectiveBase } from '../../models/itemDirectiveBase';

// const YOUTUBE_IMG_URL = 'http://img.youtube.com/vi/';

// @Directive({
//     selector: 'img[lightbox-video]',
//     host: {
//         '[style.cursor]': 'cursor',
//         '[style.visibility]': 'visibility',
//         '(click)': 'onClick($event)'
//     }
// })
// export class LightboxVideoDirective extends ItemDirectiveBase implements OnInit {

//     @Input('youtube-id') public youtubeId: string;

//     constructor(
//         protected lightboxService: LightboxService,
//         protected element: ElementRef
//     ) { 
//         super(lightboxService, element);
//     }

//     public ngOnInit() {

//         if (!this.container) {
//             throw new Error("Attribute 'lightbox-container' is required");
//         }

//         if (!this.title) {
//             throw new Error("Attribute 'lightbox-title' is required");
//         }

//         if (!this.youtubeId) {
//             throw new Error("Attribute 'youtube-id' is required");
//         }

//         if (!this.src) {
//             throw new Error("Attribute 'src' is required");
//         }

//         const video: Video = {
//             id: this.lightboxService.generateId(),
//             title: this.title,
//             youtubeId: this.youtubeId,
//             src: this.src,
//             srcXs: YOUTUBE_IMG_URL + this.youtubeId + '/default.jpg',
//             srcSm: YOUTUBE_IMG_URL + this.youtubeId + '/mqdefault.jpg',
//             srcMd: YOUTUBE_IMG_URL + this.youtubeId + '/hqdefault.jpg',
//             srcLg: YOUTUBE_IMG_URL + this.youtubeId + '/sddefault.jpg',
//             srcXl: YOUTUBE_IMG_URL + this.youtubeId + '/maxresdefault.jpg',
//         };

//         this.srcBySize = {
//             xs: YOUTUBE_IMG_URL + this.youtubeId + '/default.jpg',
//             sm: YOUTUBE_IMG_URL + this.youtubeId + '/mqdefault.jpg',
//             md: YOUTUBE_IMG_URL + this.youtubeId + '/hqdefault.jpg',
//             lg: YOUTUBE_IMG_URL + this.youtubeId + '/sddefault.jpg',
//             xl: YOUTUBE_IMG_URL + this.youtubeId + '/maxresdefault.jpg',
//         }
        
//         this.container.addItem(video);
//     }
// }
