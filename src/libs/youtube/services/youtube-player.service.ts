import { Injectable, NgZone } from '@angular/core';

import { YoutubeApiService } from './youtube-api.service';

const getWindow = () => window;

@Injectable()
export class YoutubePlayerService {

    private _window: Window;
    private player: YT.Player;

    constructor(
        private zone: NgZone,
        private youtubeApi: YoutubeApiService,
    ) {
        this._window = getWindow();
    }

    public initialise(videoId: string, config: any): void {

        if (this._window['YT'] === undefined) {

            this.youtubeApi.apiEmitter.subscribe(() => this.zone.run(() => {
                this.newPlayer(videoId, config);
            }));
        } else {

            this.zone.run(() => this.newPlayer(videoId, config));
        }
    }

    private newPlayer(videoId: string, config: any): YT.Player {

        return this.player = new YT.Player(videoId, config);
    }
}
