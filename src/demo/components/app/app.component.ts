import { Component, ViewChild, ElementRef, ViewEncapsulation, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';
import { LightboxConfigurationService } from '@sveguru/lightbox';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public dark = false;
    public navItems = [];

    @ViewChild('sidenav') private menuSidenav: MatSidenav;

    constructor(
        private _element: ElementRef,
        private _overlayContainer: OverlayContainer,
        private _router: Router,
        private _lightboxConfigurationService: LightboxConfigurationService
    ) { }

    public ngOnInit(): void {

        this._lightboxConfigurationService.controls.thumbnails.position = 'right';
        this._lightboxConfigurationService.controls.toolbar.position = 'top';

        this._router.events.subscribe((event) => {

            if (event instanceof NavigationEnd) {
                this.navItems = [
                    { name: 'Home', route: '/home', icon: 'home', active: event.url === '/home' || event.url === '/' },
                    { name: 'Theming', route: '/theming', icon: 'palette', active: event.url === '/theming' },
                    { name: 'Responsive', route: '/responsive', icon: 'tablet', active: event.url === '/responsive' },
                    { name: 'Api', route: '/api', icon: 'code', active: event.url === '/api' }
                ];
            }
        });

        window.onresize = (e) => {
            this.openForDevice();
        };
        this.openForDevice();
        if (this.isPhoneResolution()) {
            this.menuSidenav.close();
        } else {
            this.menuSidenav.open();
        }
    }

    public isPhoneResolution(): boolean {

        return (window.innerWidth < 768);
    }

    public openForDevice(): void {

        this.menuSidenav.mode = this.isPhoneResolution() ? 'over' : 'side';
    }

    public toggleTheme() {
        const darkThemeClass = 'app-dark-theme';

        this.dark = !this.dark;

        if (this.dark) {
            this._element.nativeElement.classList.add(darkThemeClass);
            this._overlayContainer.getContainerElement().classList.add(darkThemeClass);
        } else {
            this._element.nativeElement.classList.remove(darkThemeClass);
            this._overlayContainer.getContainerElement().classList.remove(darkThemeClass);
        }
    }
}
