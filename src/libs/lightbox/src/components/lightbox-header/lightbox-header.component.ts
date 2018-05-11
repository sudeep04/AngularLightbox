import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Pagination } from '../../models/pagination.interface';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';
import { HeaderAnimation } from '../../models/header-animation.interface';

@Component({
    selector: 'lightbox-header',
    templateUrl: 'lightbox-header.component.html',
    styleUrls: ['lightbox-header.component.scss'],
    animations: [
        trigger('headerAnimation', [
            state('hidden',
                style({ height: '0px' })),
            state('visible',
                style({ height: '64px' })),
            transition('hidden => visible', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } }),
            transition('visible => hidden', [
                animate('{{duration}}s')
            ], { params: { duration: 0 } })
        ])
    ],
    host: {
        '[@headerAnimation]': 'headerAnimation'
    }
})
export class LightboxHeaderComponent implements OnInit {

    @Output() public nextEvent = new EventEmitter();

    @Output() public previousEvent = new EventEmitter();

    @Output() public firstEvent = new EventEmitter();

    @Output() public lastEvent = new EventEmitter();

    @Output() public closeEvent = new EventEmitter();

    @Output() public thumbnailsToggleEvent = new EventEmitter();

    @Input() public title: string;

    @Input() public pagination: Pagination;

    public headerAnimation: HeaderAnimation;

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {

        this.headerAnimation = { value: 'hidden', params: { duration: this.config.headerHideAnimation.duration } };
    }

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

        this.headerAnimation = { value: 'visible', params: { duration: this.config.headerShowAnimation.duration } };
    }

    public close(): void {

        this.headerAnimation = { value: 'hidden', params: { duration: this.config.headerHideAnimation.duration } };
    }

    public toggle(): void {

        if (this.headerAnimation.value === 'hidden') {

            this.headerAnimation = { value: 'visible', params: { duration: this.config.headerShowAnimation.duration } };
        } else {

            this.headerAnimation = { value: 'hidden', params: { duration: this.config.headerHideAnimation.duration } };
        }
    }
}
