import { Injectable, Inject, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LightboxOverlayContainerService } from './lightbox-overlay-container.service';

@Injectable()
export class LightboxDoomService {

    constructor(
        private _appRef: ApplicationRef,
        private _overlayContainerService: LightboxOverlayContainerService,
        @Inject(DOCUMENT) private _document: any
    ) {}

    public _appendComponentToBody(componentRef: ComponentRef<{}>) {

        this._appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

        this._overlayContainerService.getContainerElement().appendChild(domElem);
    }
}
