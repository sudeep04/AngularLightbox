/// <reference types="youtube" />
import { EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { YoutubeApiService } from '../services/youtube-api.service';
import { YoutubePlayerService } from '../services/youtube-player.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { DomSanitizer } from '@angular/platform-browser';
export declare class YoutubeComponent implements OnDestroy, OnChanges {
    youtubeApi: YoutubeApiService;
    youtubePlayer: YoutubePlayerService;
    private _domSanitizer;
    videoId: string;
    height: number;
    width: number;
    playerVars: YT.PlayerVars;
    ready: EventEmitter<YT.PlayerEvent>;
    change: EventEmitter<YT.PlayerEvent>;
    error: EventEmitter<YT.OnErrorEvent>;
    ytPlayer: YT.Player;
    private _ready;
    private _config;
    constructor(youtubeApi: YoutubeApiService, youtubePlayer: YoutubePlayerService, _domSanitizer: DomSanitizer);
    ngOnChanges(changes: SimpleChanges): void;
    onReady(event: YT.PlayerEvent): void;
    onChange(event: YT.PlayerEvent): void;
    onError(event: YT.OnErrorEvent): void;
    ngOnDestroy(): void;
}
