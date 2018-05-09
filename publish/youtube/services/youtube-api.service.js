import { Injectable, EventEmitter } from '@angular/core';
var getWindow = function () { return window; };
var ɵ0 = getWindow;
var YoutubeApiService = /** @class */ (function () {
    function YoutubeApiService() {
        this.apiEmitter = new EventEmitter();
        this.hasLoaded = false;
        this._window = getWindow();
    }
    YoutubeApiService.prototype.loadApi = function () {
        var _this = this;
        if (!this.hasLoaded) {
            var scriptTag = this._window.document.createElement('script');
            scriptTag.type = 'text/javascript';
            scriptTag.src = 'https://www.youtube.com/iframe_api';
            this._window.document.body.appendChild(scriptTag);
            this._window['onYouTubeIframeAPIReady'] = function () {
                _this.apiEmitter.emit();
            };
            this.hasLoaded = true;
        }
    };
    YoutubeApiService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    YoutubeApiService.ctorParameters = function () { return []; };
    return YoutubeApiService;
}());
export { YoutubeApiService };
export { ɵ0 };
//# sourceMappingURL=youtube-api.service.js.map