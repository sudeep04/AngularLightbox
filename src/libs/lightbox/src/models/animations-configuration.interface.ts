import { ToolbarShowAnimationConfiguration } from './configurations/toolbar-show-animation-configuration.interface';
import { ToolbarHideAnimationConfiguration } from './configurations/toolbar-hide-animation-configuration.interface';
import { BackgroundFadeInAnimationConfiguration } from './configurations/background-fade-in-animation-configuration.interface';
import { BackgroundFadeOutAnimationConfiguration } from './configurations/background-fade-out-animation-configuration.interface';
import { ThumbnailsShowAnimationConfiguration } from './configurations/thumbnails-show-animation-configuration.interface';
import { ThumbnailsHideAnimationConfiguration } from './configurations/thumbnails-hide-animation-configuration.interface';
import { ThumbnailsSliceAnimationConfiguration } from './configurations/thumbnails-slice-animation-configuration.interface';
import { ZoomShowAnimationConfiguration } from './configurations/zoom-show-animation-configuration.interface';
import { ZoomHideAnimationConfiguration } from './configurations/zoom-hide-animation-configuration.interface';
import { ZoomInAnimationConfiguration } from './configurations/zoom-in-animation-configuration.interface';
import { ZoomOutAnimationConfiguration } from './configurations/zoom-out-animation-configuration.interface';
import { FeetToWidthAnimationConfiguration } from './configurations/feet-to-width-animation-configuration.interface';
import { ResetZoomAnimationConfiguration } from './configurations/reset-zoom-animation-configuration.interface';
import { ItemSliceAnimationConfiguration } from './configurations/item-slice-animation-configuration.interface';
import { ItemOpenAnimationConfiguration } from './configurations/item-open-animation-configuration.interface';


export interface AnimationsConfiguration {
    toolbarShow: ToolbarShowAnimationConfiguration;
    toolbarHide: ToolbarHideAnimationConfiguration;
    backgroundFadeIn: BackgroundFadeInAnimationConfiguration;
    backgroundFadeOut: BackgroundFadeOutAnimationConfiguration;
    thumbnailsShow: ThumbnailsShowAnimationConfiguration;
    thumbnailsHide: ThumbnailsHideAnimationConfiguration;
    thumbnailsSlice: ThumbnailsSliceAnimationConfiguration;
    zoomShow: ZoomShowAnimationConfiguration;
    zoomHide: ZoomHideAnimationConfiguration;
    zoomIn: ZoomInAnimationConfiguration;
    zoomOut: ZoomOutAnimationConfiguration;
    feetToWidth: FeetToWidthAnimationConfiguration;
    resetZoom: ResetZoomAnimationConfiguration;
    itemSlice: ItemSliceAnimationConfiguration;
    itemOpen: ItemOpenAnimationConfiguration;
}
