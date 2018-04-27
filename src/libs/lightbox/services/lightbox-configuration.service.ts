import { Injectable } from '@angular/core';
import { LightboxConfiguration } from '../models/lightbox-configuration.interface';
import { ControlConfiguration } from '../models/control-configuration.interface';
import { AnimationConfiguration } from '../models/animation-configuration.interface';
import { FadeAnimationConfiguration } from '../models/fade-animation-configuration.interface';

@Injectable()
export class LightboxConfigurationService {

    private _configuration: LightboxConfiguration;

    constructor(
    ) {
        this._configuration = {
            controls: {
                forward: { disable: false },
                backward: { disable: false },
                thumbnails: { disable: false },
                jumpToStart: { disable: false },
                jumpToEnd: { disable: false },
                itemIndex: { disable: false },
                navigation: { disable: false },
                zoom: { disable: false },
                zoomIn: { disable: false },
                zoomOut: { disable: false },
                feetToWidth: { disable: false },
                resetZoom: { disable: false },
            },
            animations: {
                headerShow: { duration: .4 },
                headerHide: { duration: .05 },
                backgroundFadeShow: { duration: .4, opacity: .9 },
                backgroundFadeHide: { duration: .05 },
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

    public get forwardControl(): ControlConfiguration {

        return this._configuration.controls.forward;
    }

    public set forwardControl(config: ControlConfiguration) {

        this._configuration.controls.forward = config;
    }

    public get backwardControl(): ControlConfiguration {

        return this._configuration.controls.backward;
    }

    public set backwardControl(config: ControlConfiguration) {

        this._configuration.controls.backward = config;
    }

    public get thumbnailsControl(): ControlConfiguration {

        return this._configuration.controls.thumbnails;
    }

    public set thumbnailsControl(config: ControlConfiguration) {

        this._configuration.controls.thumbnails = config;
    }

    public get jumpToStartControl(): ControlConfiguration {

        return this._configuration.controls.jumpToStart;
    }

    public set jumpToStartControl(config: ControlConfiguration) {

        this._configuration.controls.jumpToStart = config;
    }

    public get jumpToEndControl(): ControlConfiguration {

        return this._configuration.controls.jumpToEnd;
    }

    public set jumpToEndControl(config: ControlConfiguration) {

        this._configuration.controls.jumpToEnd = config;
    }

    public get itemIndexControl(): ControlConfiguration {

        return this._configuration.controls.itemIndex;
    }

    public set itemIndexControl(config: ControlConfiguration) {

        this._configuration.controls.itemIndex = config;
    }

    public get navigationControl(): ControlConfiguration {

        return this._configuration.controls.navigation;
    }

    public set navigationControl(config: ControlConfiguration) {

        this._configuration.controls.navigation = config;
    }

    public get zoomControl(): ControlConfiguration {

        return this._configuration.controls.zoom;
    }

    public set zoomControl(config: ControlConfiguration) {

        this._configuration.controls.zoom = config;
    }

    public get zoomInControl(): ControlConfiguration {

        return this._configuration.controls.zoomIn;
    }

    public set zoomInControl(config: ControlConfiguration) {

        this._configuration.controls.zoomIn = config;
    }

    public get zoomOutControl(): ControlConfiguration {

        return this._configuration.controls.zoomOut;
    }

    public set zoomOutControl(config: ControlConfiguration) {

        this._configuration.controls.zoomOut = config;
    }

    public get feetToWidthControl(): ControlConfiguration {

        return this._configuration.controls.feetToWidth;
    }

    public set feetToWidthControl(config: ControlConfiguration) {

        this._configuration.controls.feetToWidth = config;
    }

    public get resetZoomControl(): ControlConfiguration {

        return this._configuration.controls.resetZoom;
    }

    public set resetZoomControl(config: ControlConfiguration) {

        this._configuration.controls.resetZoom = config;
    }

    public get headerShowAnimation(): AnimationConfiguration {

        return this._configuration.animations.headerShow;
    }

    public set headerShowAnimation(config: AnimationConfiguration) {

        this._configuration.animations.headerShow = config;
    }

    public get headerHideAnimation(): AnimationConfiguration {

        return this._configuration.animations.headerHide;
    }

    public set headerHideAnimation(config: AnimationConfiguration) {

        this._configuration.animations.headerHide = config;
    }

    public get backgroundFadeShowAnimation(): FadeAnimationConfiguration {

        return this._configuration.animations.backgroundFadeShow;
    }

    public set backgroundFadeShowAnimation(config: FadeAnimationConfiguration) {

        this._configuration.animations.backgroundFadeShow = config;
    }

    public get backgroundFadeHideAnimation(): AnimationConfiguration {

        return this._configuration.animations.backgroundFadeHide;
    }

    public set backgroundFadeHideAnimation(config: AnimationConfiguration) {

        this._configuration.animations.backgroundFadeHide = config;
    }

    public get thumbnailsShowAnimation(): AnimationConfiguration {

        return this._configuration.animations.thumbnailsShow;
    }

    public set thumbnailsShowAnimation(config: AnimationConfiguration) {

        this._configuration.animations.thumbnailsShow = config;
    }

    public get thumbnailsHideAnimation(): AnimationConfiguration {

        return this._configuration.animations.thumbnailsHide;
    }

    public set thumbnailsHideAnimation(config: AnimationConfiguration) {

        this._configuration.animations.thumbnailsHide = config;
    }

    public get thumbnailsSliceAnimation(): AnimationConfiguration {

        return this._configuration.animations.thumbnailsSlice;
    }

    public set thumbnailsSliceAnimation(config: AnimationConfiguration) {

        this._configuration.animations.thumbnailsSlice = config;
    }

    public get zoomShowAnimation(): AnimationConfiguration {

        return this._configuration.animations.zoomShow;
    }

    public set zoomShowAnimation(config: AnimationConfiguration) {

        this._configuration.animations.zoomShow = config;
    }

    public get zoomHideAnimation(): AnimationConfiguration {

        return this._configuration.animations.zoomHide;
    }

    public set zoomHideAnimation(config: AnimationConfiguration) {

        this._configuration.animations.zoomHide = config;
    }

    public get zoomInAnimation(): AnimationConfiguration {

        return this._configuration.animations.zoomIn;
    }

    public set zoomInAnimation(config: AnimationConfiguration) {

        this._configuration.animations.zoomIn = config;
    }

    public get zoomOutAnimation(): AnimationConfiguration {

        return this._configuration.animations.zoomOut;
    }

    public set zoomOutAnimation(config: AnimationConfiguration) {

        this._configuration.animations.zoomOut = config;
    }

    public get feetToWidthAnimation(): AnimationConfiguration {

        return this._configuration.animations.feetToWidth;
    }

    public set feetToWidthAnimation(config: AnimationConfiguration) {

        this._configuration.animations.feetToWidth = config;
    }

    public get resetZoomAnimation(): AnimationConfiguration {

        return this._configuration.animations.resetZoom;
    }

    public set resetZoomAnimation(config: AnimationConfiguration) {

        this._configuration.animations.resetZoom = config;
    }

    public get itemSliceAnimation(): AnimationConfiguration {

        return this._configuration.animations.itemSlice;
    }

    public set itemSliceAnimation(config: AnimationConfiguration) {

        this._configuration.animations.itemSlice = config;
    }

    public get itemOpenAnimation(): AnimationConfiguration {

        return this._configuration.animations.headerShow;
    }

    public set itemOpenAnimation(config: AnimationConfiguration) {

        this._configuration.animations.headerShow = config;
    }
}
