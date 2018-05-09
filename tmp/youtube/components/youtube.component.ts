import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { YoutubeApiService } from '../services/youtube-api.service';
import { YoutubePlayerService } from '../services/youtube-player.service';
import {  } from '@types/youtube';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'youtube',
    template: `
      <div id="lightbox-youtube-player"></div>
    `,
    styles: [`
      youtube iframe{top:0;position:absolute;z-index:1;height:100%;width:100%}
    `],
    encapsulation: ViewEncapsulation.None,
})
export class YoutubeComponent implements OnDestroy, OnChanges {

    @Input() public videoId: string;

    @Input() public height: number;

    @Input() public width: number;

    @Input() public playerVars: YT.PlayerVars;

    @Output() public ready = new EventEmitter<YT.PlayerEvent>();

    @Output() public change = new EventEmitter<YT.PlayerEvent>();

    @Output() public error = new EventEmitter<YT.OnErrorEvent>();

    public ytPlayer: YT.Player;

    private _ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _config: YT.PlayerOptions;

    constructor(
        public youtubeApi: YoutubeApiService,
        public youtubePlayer: YoutubePlayerService,
        private _domSanitizer: DomSanitizer
    ) {
        this.youtubeApi.loadApi();
        this._config = {
            height: this.height ? this.height : 390,
            width:  this.width ? this.width : 390,
            videoId: '',
            playerVars: this.playerVars ? this.playerVars : {
                rel: 0,
                showinfo: 0
            },
            events: {
                onReady: this.onReady.bind(this),
                onError: this.onError.bind(this)
            }
        };
    }

    public ngOnChanges(changes: SimpleChanges): void {

        if (changes['videoId'] && changes['videoId'].currentValue) {
            this._config.videoId = changes['videoId'].currentValue;
            this.youtubePlayer.initialise('lightbox-youtube-player', this._config);

            this._ready.filter((value) => value).first().subscribe(() => {

                if (this.videoId) {

                    this.ytPlayer.cueVideoById(this.videoId);
                }
            });
        }
    }

    public onReady(event: YT.PlayerEvent): void {

        this.ytPlayer = event.target;
        this._ready.next(true);
        this.ytPlayer.addEventListener('onStateChange', (e: YT.PlayerEvent) => {
            this.onChange(e);
        });

        this.ready.emit(event);
    }

    public onChange(event: YT.PlayerEvent): void {

        this.change.emit(event);
    }

    public onError(event: YT.OnErrorEvent): void {

        this.error.emit(event);
    }

    public ngOnDestroy(): void {

        if (this.ytPlayer) {

            this.ytPlayer.destroy();
        }
    }
}
