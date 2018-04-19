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
                animate('.2s')
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
}
