import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef, Inject, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { LightboxComponent } from '../components/lightbox/lightbox.component';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class DoomService {

    private _lightboxComponentRef: ComponentRef<LightboxComponent>;

    constructor(
        private readonly _appRef: ApplicationRef,
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _injector: Injector,
        @Inject(DOCUMENT) private readonly _document: any
    ) {
        this._lightboxComponentRef = this._componentFactoryResolver
            .resolveComponentFactory(LightboxComponent)
            .create(this._injector);

        this._appRef.attachView(this._lightboxComponentRef.hostView);

        const domElement = (this._lightboxComponentRef.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        const container = this._document.createElement('div');

        container.classList.add('lightbox-overlay-container');

        this._document.body.appendChild(container);
        container.appendChild(domElement);
    }

    public get lightboxComponentRef(): ComponentRef<LightboxComponent> {

        return this._lightboxComponentRef;
    }
}
