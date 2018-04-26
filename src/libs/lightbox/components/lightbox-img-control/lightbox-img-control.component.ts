import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'lightbox-img-control',
    templateUrl: './lightbox-img-control.component.html',
    styleUrls: ['./lightbox-img-control.component.scss'],
    animations: [
        trigger('animator', [
            state('hidden',
                style({ bottom: '-64px' })),
            state('showed',
                style({ bottom: '0px' })),
            transition('hidden => showed', [
                animate('.4s')
            ]),
            transition('showed => hidden', [
                animate('.05s')
            ]),
        ])
    ],
    host: {
        '[@animator]': 'animator'
    }
})
export class LightboxImgControlComponent {

    @Output() public zoomInEvent = new EventEmitter();

    @Output() public zoomOutEvent = new EventEmitter();

    @Output() public resetZoomEvent = new EventEmitter();

    @Output() public feetToWidthEvent = new EventEmitter();
    @Input() public disableZoomIn: boolean;
    @Input() public disableZoomOut: boolean;
    @Input() public disableResetZoom: boolean;
    @Input() public disableFeetToWidth: boolean;

    public animator: 'hidden' | 'showed' = 'hidden';

    public close(): void {

        this.animator = 'hidden';
    }

    public open(): void {

        this.animator = 'showed';
    }

    public toggle(): void {

        if (this.animator === 'hidden') {

            this.animator = 'showed';
        } else {

            this.animator = 'hidden';
        }
    }

    public zoomIn() {

        if (!this.disableZoomIn) {

            this.zoomInEvent.emit();
        }
    }

    public zoomOut() {

        if (!this.disableZoomOut) {

            this.zoomOutEvent.emit();
        }
    }

    public resetZoom() {

        if (!this.disableResetZoom) {

            this.resetZoomEvent.emit();
        }
    }

    public feetToWidth() {

        if (!this.disableFeetToWidth) {

            this.feetToWidthEvent.emit();
        }
    }
}
