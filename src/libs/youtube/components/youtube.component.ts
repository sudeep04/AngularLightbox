import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { YoutubeApiService } from '../services/youtube-api.service';
import { YoutubePlayerService } from '../services/youtube-player.service';
import {  } from '@types/youtube';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'youtube',
    templateUrl: './youtube.component.html',
})
export class YoutubeComponent implements OnInit, OnDestroy {

    @Input() public videoId: string;

    @Output() public ready = new EventEmitter<YT.PlayerEvent>();
    @Output() public change = new EventEmitter<YT.PlayerEvent>();
    @Output() public error = new EventEmitter<YT.OnErrorEvent>();

    public ytPlayer: YT.Player;

    public iframeUrl: any;

    constructor(
        public youtubeApi: YoutubeApiService,
        public youtubePlayer: YoutubePlayerService,
        private _domSanitizer: DomSanitizer
    ) {
        this.youtubeApi.loadApi();
    }

    public ngOnInit() {

        this.iframeUrl = this._domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1&rel=0');

        const config = {
            height: '390',
            width: '640',
            videoId: this.videoId,
            playerVars: {
                rel: 0,
                showinfo: 0,
                // color:
            },
            events: {
                onReady: this.onReady.bind(this),
                onError: this.onError.bind(this)
            }
        };

        this.youtubePlayer.initialise(this.videoId, config);
    }

    public onReady(event: YT.PlayerEvent): void {
        this.ytPlayer = event.target;
        this.ytPlayer.addEventListener('onStateChange', (e) => {
            this.onChange(e);
        });

        this.ytPlayer.cueVideoById(this.videoId);

        this.ready.emit(event);
    }

    public onChange(event: YT.PlayerEvent): void {

        this.change.emit(event);
    }

    public onError(event: YT.OnErrorEvent): void {
        this.error.emit(event);
    }

    public ngOnDestroy() {

        if (this.ytPlayer) {
            
            this.ytPlayer.destroy();
        }
    }
}
