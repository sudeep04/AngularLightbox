import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Pagination } from '../../models/pagination.interface';
import { ToolbarAnimation } from '../../models/toolbar-animation.interface';
import { LightboxConfigurationService } from '../../services/lightbox-configuration.service';

@Component({
    selector: 'lightbox-toolbar',
    templateUrl: 'lightbox-toolbar.component.html',
    styleUrls: ['lightbox-toolbar.component.scss'],
    animations: [
        trigger('toolbarAnimation', [
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
        '[@toolbarAnimation]': 'toolbarAnimation'
    }
})
export class LightboxToolbarComponent implements OnInit {

    @Output() public nextEvent = new EventEmitter();

    @Output() public previousEvent = new EventEmitter();

    @Output() public firstEvent = new EventEmitter();

    @Output() public lastEvent = new EventEmitter();

    @Output() public closeEvent = new EventEmitter();

    @Output() public thumbnailsToggleEvent = new EventEmitter();

    @Input() public title: string;

    @Input() public pagination: Pagination;

    public toolbarAnimation: ToolbarAnimation;

    public get config(): LightboxConfigurationService {

        return this._lightboxConfigurationService;
    }

    constructor(
        private readonly _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {

        this.toolbarAnimation = { value: 'hidden', params: { duration: this.config.animations.toolbarHide.duration } };
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

        this.toolbarAnimation = { value: 'visible', params: { duration: this.config.animations.toolbarShow.duration } };
    }

    public close(): void {

        this.toolbarAnimation = { value: 'hidden', params: { duration: this.config.animations.toolbarHide.duration } };
    }

    public toggle(): void {

        if (this.toolbarAnimation.value === 'hidden') {

            this.toolbarAnimation = { value: 'visible', params: { duration: this.config.animations.toolbarShow.duration } };
        } else {

            this.toolbarAnimation = { value: 'hidden', params: { duration: this.config.animations.toolbarHide.duration } };
        }
    }
}
