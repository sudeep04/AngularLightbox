import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class YoutubeApiService {

    public apiEmitter: EventEmitter<null> = new EventEmitter<null>();

    private hasLoaded = false;

    public loadApi(): void {
        if (!this.hasLoaded) {

            const scriptTag = window.document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = 'https://www.youtube.com/iframe_api';
            window.document.body.appendChild(scriptTag);

            window['onYouTubeIframeAPIReady'] = () => {

                this.apiEmitter.emit();
            };

            this.hasLoaded = true;
        }
    }
}
