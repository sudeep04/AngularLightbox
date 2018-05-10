import { Injectable, NgZone } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';

const getWindow = () => window;

@Injectable()
export class YoutubePlayerService {

    private _player: YT.Player;

    private _window: any;

    constructor(
        private zone: NgZone,
        private youtubeApi: YoutubeApiService,
    ) { 
        this._window = getWindow();
    }

    public initialise(playerId: string, config: any): void {

        if (!this._player) {

            if (this._window['YT'] === undefined) {

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
