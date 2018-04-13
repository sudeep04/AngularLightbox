import { Component, OnInit, Input, AfterContentInit, Renderer2, Output, EventEmitter, OnDestroy } from '@angular/core';
import { YoutubeApiService } from '../services/youtube.api.service';
import { YoutubePlayerService } from '../services/youtube.player.service';
import {} from '@types/youtube';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
	selector: 'youtube',
    templateUrl: './youtube.component.html',
})
export class YoutubeComponent implements OnInit, OnDestroy {

	@Input() videoId: string;

	@Output() ready = new EventEmitter<YT.PlayerEvent>();
	@Output() change = new EventEmitter<YT.PlayerEvent>();
	@Output() error = new EventEmitter<YT.OnErrorEvent>();

	ytPlayer: YT.Player;

	iframeUrl: any;

	constructor(
		public youtubeApi: YoutubeApiService,
		public youtubePlayer: YoutubePlayerService,
		private _domSanitizer: DomSanitizer
	) {
		this.youtubeApi.loadApi();
	}

	ngOnInit() {
	
		this.iframeUrl = this._domSanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.videoId + '?enablejsapi=1&rel=0')

		const config = {
			events: {
				onReady: this.onReady.bind(this),
				onError: this.onError.bind(this)
			}
		}
	
		this.youtubePlayer.initialise(this.videoId, config);
	}

	onReady(event: YT.PlayerEvent): void {
		this.ytPlayer = event.target;
		this.ytPlayer.addEventListener('onStateChange', (e) => {
			this.onChange(e);
		});
		console.log('11')
		this.ytPlayer.loadVideoById(this.videoId);
		console.log('12')

		this.ready.emit(event);
	}

	onChange(event: YT.PlayerEvent): void {
		this.change.emit(event);
	}

	onError(event: YT.OnErrorEvent): void {
		this.error.emit(event);
	}

	ngOnDestroy() {
		this.ytPlayer.destroy();
	}
}
