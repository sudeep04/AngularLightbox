import { Injectable, ComponentRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { LightboxDoomService } from './lightbox-doom.service';
import { LightboxPanelComponent } from '../components/lightbox-panel/lightbox-panel.component';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LightboxService {

    private _idIndex: number = 0;
    private _lightboxPanelRef: ComponentRef<LightboxPanelComponent>;

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _injector: Injector,
        private _lightboxDoomService: LightboxDoomService
    ) {
        this._lightboxPanelRef = this._componentFactoryResolver
        .resolveComponentFactory(LightboxPanelComponent)
        .create(this._injector);
        this._lightboxDoomService._appendComponentToBody(this._lightboxPanelRef);
    }

    public generateId(): number {

        return this._idIndex++;
    }

    public get lightboxPanel(): LightboxPanelComponent {

        return this._lightboxPanelRef.instance;
    }

    public get panel(): LightboxPanelComponent {
        return this._lightboxPanelRef.instance;
    }
}
