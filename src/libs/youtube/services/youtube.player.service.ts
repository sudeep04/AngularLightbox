import { Injectable, NgZone } from '@angular/core';

import { YoutubeApiService } from './youtube.api.service';

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
	
	initialise(videoId: string, config: any): void {

		if(this._window["YT"] === undefined) {

			console.log('yt not ready')
			this.youtubeApi.apiEmitter.subscribe(() => this.zone.run(() => {this.newPlayer(videoId, config);
			
				console.log('yt ready')
			}));
		} else {

			console.log('yt ready')
			this.zone.run(() => this.newPlayer(videoId, config));
		}
	}

	private newPlayer(videoId: string, config:  any): YT.Player {

		console.log('se creo!!!');
		return this.player = new YT.Player(videoId, config);
	}

}
