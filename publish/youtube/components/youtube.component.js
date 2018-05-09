import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { YoutubeApiService } from '../services/youtube-api.service';
import { YoutubePlayerService } from '../services/youtube-player.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var YoutubeComponent = /** @class */ (function () {
    function YoutubeComponent(youtubeApi, youtubePlayer, _domSanitizer) {
        this.youtubeApi = youtubeApi;
        this.youtubePlayer = youtubePlayer;
        this._domSanitizer = _domSanitizer;
        this.ready = new EventEmitter();
        this.change = new EventEmitter();
        this.error = new EventEmitter();
        this._ready = new BehaviorSubject(false);
        this.youtubeApi.loadApi();
        this._config = {
            height: this.height ? this.height : 390,
            width: this.width ? this.width : 390,
            videoId: '',
            playerVars: this.playerVars ? this.playerVars : {
                rel: 0,
                showinfo: 0
            },
            events: {
                onReady: this.onReady.bind(this),
                onError: this.onError.bind(this)
            }
        };
    }
    YoutubeComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['videoId'] && changes['videoId'].currentValue) {
            this._config.videoId = changes['videoId'].currentValue;
            this.youtubePlayer.initialise('lightbox-youtube-player', this._config);
            this._ready.filter(function (value) { return value; }).first().subscribe(function () {
                if (_this.videoId) {
                    _this.ytPlayer.cueVideoById(_this.videoId);
                }
            });
        }
    };
    YoutubeComponent.prototype.onReady = function (event) {
        var _this = this;
        this.ytPlayer = event.target;
        this._ready.next(true);
        this.ytPlayer.addEventListener('onStateChange', function (e) {
            _this.onChange(e);
        });
        this.ready.emit(event);
    };
    YoutubeComponent.prototype.onChange = function (event) {
        this.change.emit(event);
    };
    YoutubeComponent.prototype.onError = function (event) {
        this.error.emit(event);
    };
    YoutubeComponent.prototype.ngOnDestroy = function () {
        if (this.ytPlayer) {
            this.ytPlayer.destroy();
        }
    };
    YoutubeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'youtube',
                    template: "\n      <div id=\"lightbox-youtube-player\"></div>\n    ",
                    styles: ["\n      youtube iframe{top:0;position:absolute;z-index:1;height:100%;width:100%}\n    "],
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    YoutubeComponent.ctorParameters = function () { return [
        { type: YoutubeApiService, },
        { type: YoutubePlayerService, },
        { type: DomSanitizer, },
    ]; };
    YoutubeComponent.propDecorators = {
        "videoId": [{ type: Input },],
        "height": [{ type: Input },],
        "width": [{ type: Input },],
        "playerVars": [{ type: Input },],
        "ready": [{ type: Output },],
        "change": [{ type: Output },],
        "error": [{ type: Output },],
    };
    return YoutubeComponent;
}());
export { YoutubeComponent };
//# sourceMappingURL=youtube.component.js.map