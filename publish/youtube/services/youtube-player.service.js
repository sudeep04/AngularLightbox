import { Injectable, NgZone } from '@angular/core';
import { YoutubeApiService } from './youtube-api.service';
var getWindow = function () { return window; };
var ɵ0 = getWindow;
var YoutubePlayerService = /** @class */ (function () {
    function YoutubePlayerService(zone, youtubeApi) {
        this.zone = zone;
        this.youtubeApi = youtubeApi;
        this._window = getWindow();
    }
    YoutubePlayerService.prototype.initialise = function (playerId, config) {
        var _this = this;
        if (!this._player) {
            if (this._window['YT'] === undefined) {
                this.youtubeApi.apiEmitter.subscribe(function () {
                    return _this.zone.run(function () {
                        _this._newPlayer(playerId, config);
                    });
                });
            }
            else {
                this.zone.run(function () { return _this._newPlayer(playerId, config); });
            }
        }
    };
    YoutubePlayerService.prototype._newPlayer = function (playerId, config) {
        return this._player = new YT.Player(playerId, config);
    };
    YoutubePlayerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    YoutubePlayerService.ctorParameters = function () { return [
        { type: NgZone, },
        { type: YoutubeApiService, },
    ]; };
    return YoutubePlayerService;
}());
export { YoutubePlayerService };
export { ɵ0 };
//# sourceMappingURL=youtube-player.service.js.map