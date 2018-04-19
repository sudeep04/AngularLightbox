import { Injectable, NgZone } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';

@Injectable()
export class YoutubePlayerService {

    private _player: YT.Player;

    constructor(
        private zone: NgZone,
        private youtubeApi: YoutubeApiService,
    ) { }

    public initialise(playerId: string, config: any): void {

        if (!this._player) {

            if (window['YT'] === undefined) {

                this.youtubeApi.apiEmitter.subscribe(() => this.zone.run(() => {
                    this._newPlayer(playerId, config);
                }));
            } else {

                this.zone.run(() => this._newPlayer(playerId, config));
            }
        }
    }

    private _newPlayer(playerId: string, config: any): YT.Player {

        return this._player = new YT.Player(playerId, config);
    }
}
