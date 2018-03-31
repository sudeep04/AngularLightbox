import { Injectable, Inject, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { OverlayContainer } from '../models/overlay-container';
import { LightboxPanelComponent } from '../components/lightbox-panel/lightbox-panel.component';

@Injectable()
export class LightboxDoomService {

    private _componentRef: ComponentRef<{}>;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector,
        private _overlayContainer: OverlayContainer,
        @Inject(DOCUMENT) private _document: any
    ) {
        this._appendComponentToBody(LightboxPanelComponent);
    }

    public destroyComponentAttachedToBody() {
        this._appRef.detachView(this._componentRef.hostView);
        this._overlayContainer.destroy();
    }

    private _appendComponentToBody(component: any) {

        this._componentRef = this._componentFactoryResolver
        .resolveComponentFactory(component)
        .create(this._injector);

        this._appRef.attachView(this._componentRef.hostView);

        const domElem = (this._componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

        this._overlayContainer.getContainerElement().appendChild(domElem);
    }
}
