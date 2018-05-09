import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeApiService } from './services/youtube-api.service';
import { YoutubePlayerService } from './services/youtube-player.service';
import { YoutubeComponent } from './components/youtube.component';
var YoutubeModule = /** @class */ (function () {
    function YoutubeModule() {
    }
    YoutubeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    providers: [
                        YoutubeApiService,
                        YoutubePlayerService
                    ],
                    declarations: [
                        YoutubeComponent
                    ],
                    exports: [
                        YoutubeComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    YoutubeModule.ctorParameters = function () { return []; };
    return YoutubeModule;
}());
export { YoutubeModule };
//# sourceMappingURL=youtube.module.js.map