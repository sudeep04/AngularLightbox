import { Injectable, Inject, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '../models/overlay-container';

@Injectable()
export class LightboxDoomService {

    constructor(
        private _appRef: ApplicationRef,
        private _overlayContainer: OverlayContainer,
        @Inject(DOCUMENT) private _document: any
    ) {}

    public _appendComponentToBody(componentRef: ComponentRef<{}>) {

        this._appRef.attachView(componentRef.hostView);

        const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

        this._overlayContainer.getContainerElement().appendChild(domElem);
    }
}
