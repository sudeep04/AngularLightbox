import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'lightbox-header',
    templateUrl: './lightbox-header.component.html',
    styleUrls: ['./lightbox-header.component.scss'],
    animations: [
        trigger('animator', [
            state('hidden',
                style({ top: '-64px' })),
            state('showed',
                style({ top: '0px' })),
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
export class LightboxHeaderComponent {

    @Output() public closeEvent = new EventEmitter();

    @Input() public title: string;

    public animator: 'hidden' | 'showed' = 'hidden';

    public close(): void {

        this.animator = 'hidden';
    }

    public onClose(): void {

        this.closeEvent.emit();
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
