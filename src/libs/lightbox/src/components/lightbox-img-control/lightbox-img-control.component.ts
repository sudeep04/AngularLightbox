import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ZoomAnimation } from '../../models/zoom-animation.interface';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

@Component({
    selector: 'lightbox-img-control',
    templateUrl: 'lightbox-img-control.component.html',
    styleUrls: ['lightbox-img-control.component.scss'],
    animations: [
        trigger('zoomAnimation', [
            state('hidden',
                style({ bottom: '-64px' })),
            state('visible',
                style({ bottom: '0px' })),
            transition('hidden => visible', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } }),
            transition('visible => hidden', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ])
    ],
    host: {
        '[@zoomAnimation]': 'zoomAnimation'
    }
})
export class LightboxImgControlComponent implements OnInit {

    @Output() public zoomInEvent = new EventEmitter();

    @Output() public zoomOutEvent = new EventEmitter();

    @Output() public resetZoomEvent = new EventEmitter();

    @Output() public feetToWidthEvent = new EventEmitter();

    @Input() public disableZoomIn: boolean;

    @Input() public disableZoomOut: boolean;

    @Input() public disableResetZoom: boolean;

    @Input() public disableFeetToWidth: boolean;

    public zoomAnimation: ZoomAnimation;

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {

        this.zoomAnimation = { value: 'hidden', params: { duration: this.config.animations.zoomHide.duration } };
    }

    public close(): void {

        if (!this.config.controls.zoom.disable) {

            this.zoomAnimation = { value: 'hidden', params: { duration: this.config.animations.zoomHide.duration } };
        }
    }

    public open(): void {

        if (!this.config.controls.zoom.disable) {

            this.zoomAnimation = { value: 'visible', params: { duration: this.config.animations.zoomShow.duration } };
        }
    }

    public toggle(): void {

        if (!this.config.controls.zoom.disable) {

            if (this.zoomAnimation.value === 'hidden') {

                this.zoomAnimation = { value: 'visible', params: { duration: this.config.animations.zoomShow.duration } };
            } else {

                this.zoomAnimation = { value: 'hidden', params: { duration: this.config.animations.zoomHide.duration } };
            }
        }
    }

    public onZoomIn(): void {

        if (!this.disableZoomIn) {

            this.zoomInEvent.emit();
        }
    }

    public onZoomOut(): void {

        if (!this.disableZoomOut) {

            this.zoomOutEvent.emit();
        }
    }

    public onResetZoom(): void {

        if (!this.disableResetZoom) {

            this.resetZoomEvent.emit();
        }
    }

    public onFeetToWidth(): void {

        if (!this.disableFeetToWidth) {

            this.feetToWidthEvent.emit();
        }
    }
}
