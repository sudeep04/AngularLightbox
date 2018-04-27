import { Component, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Pagination } from '../../models/pagination.interface';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

@Component({
    selector: 'lightbox-header',
    templateUrl: './lightbox-header.component.html',
    styleUrls: ['./lightbox-header.component.scss'],
    animations: [
        trigger('animator', [
            state('hidden',
                style({ height: '0px' })),
            state('visible',
                style({ height: '64px' })),
            transition('hidden => visible', [
                animate('.4s')
            ]),
            transition('visible => hidden', [
                animate('.05s')
            ]),
        ])
    ],
    host: {
        '[@animator]': 'animator'
    }
})
export class LightboxHeaderComponent {

    @Output() public nextEvent = new EventEmitter();

    @Output() public previousEvent = new EventEmitter();

    @Output() public firstEvent = new EventEmitter();

    @Output() public lastEvent = new EventEmitter();

    @Output() public closeEvent = new EventEmitter();

    @Output() public thumbnailsToggleEvent = new EventEmitter();

    @Input() public title: string;

    @Input() public pagination: Pagination;

    public animator: 'hidden' | 'visible' = 'hidden';

    public get config(): LightboxConfigurationService {
        
        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public onNext(): void {

        this.nextEvent.emit();
    }

    public onPrevious(): void {

        this.previousEvent.emit();
    }

    public onFirst(): void {

        this.firstEvent.emit();
    }

    public onLast(): void {

        this.lastEvent.emit();
    }

    public onClose(): void {

        this.closeEvent.emit();
    }

    public onThumbnailsToggle() {

        this.thumbnailsToggleEvent.emit();
    }

    public open(): void {

        this.animator = 'visible';
    }

    public close(): void {

        this.animator = 'hidden';
    }

    public toggle(): void {

        if (this.animator === 'hidden') {

            this.animator = 'visible';
        } else {

            this.animator = 'hidden';
        }
    }
}
