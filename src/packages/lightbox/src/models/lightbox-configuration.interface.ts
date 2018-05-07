import { ControlConfiguration } from './control-configuration.interface';
import { AnimationConfiguration } from './animation-configuration.interface';
import { FadeAnimationConfiguration } from './fade-animation-configuration.interface';

export interface LightboxConfiguration {
    controls?: {
        forward?: ControlConfiguration;
        backward?: ControlConfiguration;
        thumbnails?: ControlConfiguration;
        jumpToStart?: ControlConfiguration;
        jumpToEnd?: ControlConfiguration;
        itemIndex?: ControlConfiguration;
        navigation?: ControlConfiguration;
        zoom?: ControlConfiguration;
        zoomIn?: ControlConfiguration;
        zoomOut?: ControlConfiguration;
        feetToWidth?: ControlConfiguration;
        resetZoom?: ControlConfiguration;
    };
    animations?: {
        headerShow?: AnimationConfiguration;
        headerHide?: AnimationConfiguration;
        backgroundFadeShow?: FadeAnimationConfiguration;
        backgroundFadeHide?: AnimationConfiguration;
        thumbnailsShow?: AnimationConfiguration;
        thumbnailsHide?: AnimationConfiguration;
        thumbnailsSlice?: AnimationConfiguration;
        zoomShow?: AnimationConfiguration;
        zoomHide?: AnimationConfiguration;
        zoomIn?: AnimationConfiguration;
        zoomOut?: AnimationConfiguration;
        feetToWidth?: AnimationConfiguration;
        resetZoom?: AnimationConfiguration;
        itemSlice?: AnimationConfiguration;
        itemOpen?: AnimationConfiguration;
    };
}
