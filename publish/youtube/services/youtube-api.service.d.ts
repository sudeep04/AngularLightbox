import { EventEmitter } from '@angular/core';
export declare class YoutubeApiService {
    apiEmitter: EventEmitter<null>;
    private hasLoaded;
    private _window;
    constructor();
    loadApi(): void;
}
