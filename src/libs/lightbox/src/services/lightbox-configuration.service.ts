import { Injectable } from '@angular/core';
import { LightboxConfiguration } from '../models/lightbox-configuration.interface';
import { ControlsConfiguration } from '../models/controls-configuration.interface';
import { AnimationsConfiguration } from '../models/animations-configuration.interface';

@Injectable()
export class LightboxConfigurationService {

    private _configuration: LightboxConfiguration;

    constructor(
    ) {
        this._configuration = {
            controls: {
                toolbar: { position: 'top' },
                back: { icon: 'arrow_back' },
                navigation: { disable: false },
                jumpToStart: { disable: false, icon: 'first_page' },
                backward: { disable: false, icon: 'navigate_before' },
                itemIndex: { disable: false },
                forward: { disable: false, icon: 'navigate_next' },
                jumpToEnd: { disable: false, icon: 'last_page' },
                thumbnails: { disable: false, icon: 'list', position: 'right' },
                zoom: { disable: false },
                zoomIn: { disable: false, icon: 'add' },
                zoomOut: { disable: false, icon: 'remove' },
                feetToWidth: { disable: false, icon: 'zoom_in' },
                resetZoom: { disable: false, icon: 'zoom_out' },
            },
            animations: {
                toolbarShow: { duration: .4 },
                toolbarHide: { duration: .05 },
                backgroundFadeIn: { duration: .4, opacity: .9 },
                backgroundFadeOut: { duration: .05 },
                thumbnailsShow: { duration: .4 },
                thumbnailsHide: { duration: .05 },
                thumbnailsSlice: { duration: .4 },
                zoomShow: { duration: .4 },
                zoomHide: { duration: .05 },
                zoomIn: { duration: .4 },
                zoomOut: { duration: .4 },
                feetToWidth: { duration: .4 },
                resetZoom: { duration: .4 },
                itemSlice: { duration: .4 },
                itemOpen: { duration: .4 },
            }
        };
    }

    public get controls(): ControlsConfiguration {

        return this._configuration.controls;
    }

    public get animations(): AnimationsConfiguration {

        return this._configuration.animations;
    }
}
