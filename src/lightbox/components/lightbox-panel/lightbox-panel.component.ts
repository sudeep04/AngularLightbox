// import { Component, ViewChild, QueryList, ViewChildren, HostListener } from '@angular/core';
// import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { Observable } from 'rxjs/Observable';
// import { LightboxImgComponent } from '../lightbox-img/lightbox-img.component';
// import { LightboxVideoComponent } from '../lightbox-video/lightbox-video.component';
// import { LightboxItemComponent } from '../../models/lightbox-item-component';
// import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
// import { Item } from '../../models/item';
// import { IPosition } from '../../models/iPosition';

// @Component({
//     selector: 'lightbox-panel',
//     templateUrl: './lightbox-panel.component.html',
//     styleUrls: ['./lightbox-panel.component.scss'],
//     animations: [
//         trigger('fadeAnimator', [
//             state('hide', style({ opacity: 0 })),
//             state('show', style({ opacity: .9 })),
//             transition('show => hide', [
//                 animate('.05s'),
//             ]),
//             transition('hide => show', [
//                 animate('.2s')
//             ])
//         ]),
//         trigger('headerShowAnimator', [
//             state('hide', style({ top: '-64px' })),
//             state('show', style({ top: '0px' })),
//             transition('show => hide', [
//                 animate('.05s')
//             ]),
//             transition('hide => show', [
//                 animate('.2s')
//             ])
//         ])
//     ],
//     host: {
//         '[style.pointer-events]': '_pointerEvents',
//     }
// })
// export class LightboxPanelComponent {

//     public items: Item[] = [];

//     public activeItem: Item;

//     public fadeAnimator: 'show' | 'hide' = 'hide';

//     public headerShowAnimator: 'show' | 'hide' = 'hide';

//     public hasNext: boolean;

//     public hasPrevious: boolean;

//     @ViewChildren('items') private _itemsRef: QueryList<LightboxItemComponent>;
//     @ViewChild('_next') private _next: LightboxButtonComponent;
//     @ViewChild('_previous') private _previous: LightboxButtonComponent;

//     private _state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');

//     private _pointerEvents: string = 'none';

//     public get state(): 'closed' | 'opened' {

//         return this._state.getValue();
//     }

//     public get $state(): Observable<'closed' | 'opened'> {

//         return this._state.asObservable();
//     }

//     public open(items: Item[], activeItem: number, position: IPosition) {

//         this.items = items;
//         this.activeItem = this.items.find((x) => x.id === activeItem);
//         const activeItemIndex = this.items.indexOf(this.activeItem);

//         // this.items.forEach((item) => {

//         //     const itemIndex = this.items.indexOf(item);

//         //     if (itemIndex < activeItemIndex) {
//         //         item.position = 'left';
//         //     }
//         //     if (itemIndex === activeItemIndex) {
//         //         item.position = 'origin';
//         //     }
//         //     if (itemIndex > activeItemIndex) {
//         //         item.position = 'right';
//         //     }
//         // });

//         this._checkNavigation();
//         this._pointerEvents = 'auto';
//         this.fadeAnimator = 'show';
//         this._previous.show();
//         this._next.show();
//         this.headerShowAnimator = 'show';
//     }

//     public close() {

//         this.fadeAnimator = 'hide';
//         this.headerShowAnimator = 'hide';
//         this._previous.hide();
//         this._next.hide();
//     }

//     public next() {

//         const activeItemIndex = this.items.indexOf(this.activeItem);

//         if (activeItemIndex >= 0 && activeItemIndex < this.items.length - 1) {
//             this._itemsRef.toArray()[activeItemIndex].changePosition('left');
//             this.activeItem = this.items[activeItemIndex + 1];
//             this._itemsRef.toArray()[activeItemIndex + 1].changePosition('center');
//         }
//         this._checkNavigation();
//     }

//     public previous() {

//         const activeItemIndex = this.items.indexOf(this.activeItem);

//         if (activeItemIndex > 0) {
//             this._itemsRef.toArray()[activeItemIndex].changePosition('right');
//             this.activeItem = this.items[activeItemIndex - 1];
//             this._itemsRef.toArray()[activeItemIndex - 1].changePosition('center');
//         }
//         this._checkNavigation();
//     }

//     public toggleControls() {

//         if (this.headerShowAnimator === 'show') {
//             this.headerShowAnimator = 'hide';
//             this._next.hide();
//             this._previous.hide();
//         } else {
//             this.headerShowAnimator = 'show';
//             this._next.show();
//             this._previous.show();
//         }
//     }

//     public startFadeAnimator(event: AnimationEvent) {

//         if (event.fromState === 'hide') {

//             const activeItemIndex = this.items.indexOf(this.activeItem);

//             this._state.next('opened');
//             this._itemsRef.toArray()[activeItemIndex].changePosition('center');
//         }
//     }

//     public doneFadeAnimator(event: AnimationEvent) {

//         if (event.toState === 'hide') {
//             this._pointerEvents = 'none';
//             this._state.next('closed');
//             this.items = [];
//             this.activeItem = null;
//         }
//     }

//     private _checkNavigation() {

//         const activeItemIndex = this.items.indexOf(this.activeItem);

//         if (activeItemIndex > 0) {
//             this.hasPrevious = true;
//         } else {
//             this.hasPrevious = false;
//         }

//         if (activeItemIndex >= 0 && activeItemIndex < this.items.length - 1) {
//             this.hasNext = true;
//         } else {
//             this.hasNext = false;
//         }
//     }
// }
