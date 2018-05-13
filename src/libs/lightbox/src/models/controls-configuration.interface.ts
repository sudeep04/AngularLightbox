import { ToolbarControlConfiguration } from './configurations/toolbar-control-configuration.interface';
import { BackControlConfiguration } from './configurations/back-control-configuration.interface';
import { NavigationControlConfiguration } from './configurations/navigation-control-configuration.interface';
import { JumpToStartControlConfiguration } from './configurations/jump-to-start-control-configuration.interface';
import { BackwardControlConfiguration } from './configurations/backward-control-configuration.interface';
import { ItemIndexControlConfiguration } from './configurations/item-index-control-configuration.interface';
import { ForwardControlConfiguration } from './configurations/forward-control-configuration.interface';
import { JumpToEndControlConfiguration } from './configurations/jump-to-end-control-configuration.interface';
import { ThumbnailsControlConfiguration } from './configurations/thumbnails-control-configuration.interface';
import { ZoomControlConfiguration } from './configurations/zoom-control-configuration.interface';
import { ZoomInControlConfiguration } from './configurations/zoom-in-control-configuration.interface';
import { ZoomOutControlConfiguration } from './configurations/zoom-out-control-configuration.interface';
import { FeetToWidthControlConfiguration } from './configurations/feet-to-width-control-configuration.interface';
import { ResetZoomControlConfiguration } from './configurations/reset-zoom-control-configuration.interface';


export interface ControlsConfiguration {
    toolbar: ToolbarControlConfiguration;
    back: BackControlConfiguration;
    navigation: NavigationControlConfiguration;
    jumpToStart: JumpToStartControlConfiguration;
    backward: BackwardControlConfiguration;
    itemIndex: ItemIndexControlConfiguration;
    forward: ForwardControlConfiguration;
    jumpToEnd: JumpToEndControlConfiguration;
    thumbnails: ThumbnailsControlConfiguration;
    zoom: ZoomControlConfiguration;
    zoomIn: ZoomInControlConfiguration;
    zoomOut: ZoomOutControlConfiguration;
    feetToWidth: FeetToWidthControlConfiguration;
    resetZoom: ResetZoomControlConfiguration;
}
