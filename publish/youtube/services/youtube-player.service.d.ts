import { NgZone } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';
export declare class YoutubePlayerService {
    private zone;
    private youtubeApi;
    private _player;
    private _window;
    constructor(zone: NgZone, youtubeApi: YoutubeApiService);
    initialise(playerId: string, config: any): void;
    private _newPlayer(playerId, config);
}
