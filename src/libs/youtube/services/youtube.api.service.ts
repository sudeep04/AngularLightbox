import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class YoutubeApiService {

	public apiEmitter: EventEmitter<null> = new EventEmitter<null>();

	private hasLoaded = false;

	loadApi(): void {
		if(!this.hasLoaded) {

			let scriptTag = window.document.createElement("script");
			scriptTag.type = "text/javascript";
			scriptTag.src = "https://www.youtube.com/iframe_api";
			window.document.body.appendChild(scriptTag);
	
			window['onYouTubeIframeAPIReady'] = () => {

				console.log('on youtube ready');
				this.apiEmitter.emit();
			};
	
			this.hasLoaded = true;
		}
	}
}
