import { Injectable, EventEmitter } from '@angular/core';

const getWindow = () => window;

@Injectable()
export class YoutubeApiService {

    public apiEmitter: EventEmitter<null> = new EventEmitter<null>();

    private hasLoaded = false;

    private _window: any;

    constructor() {
        
		this._window = getWindow();
	}

    public loadApi(): void {

        if (!this.hasLoaded) {

            const scriptTag = this._window.document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = 'https://www.youtube.com/iframe_api';
            this._window.document.body.appendChild(scriptTag);

            this._window['onYouTubeIframeAPIReady'] = () => {

                this.apiEmitter.emit();
            };

            this.hasLoaded = true;
        }
    }
}
