import { Component, ViewChild, QueryList, ViewChildren, HostListener } from '@angular/core';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { LightboxButtonComponent } from '../lightbox-button/lightbox-button.component';
import { Item } from '../../models/item';
import { IPosition } from '../../models/iPosition';
import { LightboxHeaderComponent } from '../lightbox-header/lightbox-header.component';
import { LightboxService } from '../../services/lightbox.service';
import { LightboxItemComponent } from '../ligthbox-item/lightbox-item.component';

@Component({
    selector: 'lightbox',
    templateUrl: './lightbox.component.html',
    styleUrls: ['./lightbox.component.scss'],
    animations: [
        // trigger('fadeAnimator', [
        //     state('hide', style({ opacity: 0 })),
        //     state('show', style({ opacity: .9 })),
        //     transition('show => hide', [
        //         animate('.05s'),
        //     ]),
        //     transition('hide => show', [
        //         animate('.2s')
        //     ])
        // ]),
        trigger('headerShowAnimator', [
            state('hide', style({ top: '-64px' })),
            state('show', style({ top: '0px' })),
            transition('show => hide', [
                animate('.05s')
            ]),
            transition('hide => show', [
                animate('.2s')
            ])
        ])
    ],
    host: {
        '[style.pointer-events]': '_pointerEvents',
    }
})
export class LightboxComponent {
    
    @ViewChild('header') public header: LightboxHeaderComponent;
    
    public items: {[container: string]: Item[]} = {};

    @ViewChildren('lightboxItem') private _itemsRef: QueryList<LightboxItemComponent>;

    public activeItem: Item;

    private _pointerEvents: string = 'none';

    public addItem(item: Item): void {
        
        if(!this.items[item.container]) {

            this.items[item.container] = [];
        }
        this.items[item.container].push(item);
    }

    public removeItem(item: Item): void {

        var index = this.items[item.container].indexOf(item);
        if (index > -1) {
            this.items[item.container].splice(index, 1);
        }
    }

    public openItem(item: Item, position: IPosition): void {

        this.activeItem = item;

        this._pointerEvents = 'auto';
        this.header.open();

        setTimeout(()=>{

            const itemIndex = this.items[item.container].indexOf(item);
            const itemRef = this._itemsRef.toArray()[itemIndex];
            itemRef.animateOrigin(position).done(()=>{
                itemRef.animateCenter();
            });
        }, 0);
    }

    public getContainers(): string[]{

        return Object.keys(this.items);
    }




    


    // public fadeAnimator: 'show' | 'hide' = 'hide';

    // public hasNext: boolean;

    // public hasPrevious: boolean;

    // @ViewChild('_next') private _next: LightboxButtonComponent;
    // @ViewChild('_previous') private _previous: LightboxButtonComponent;

    // private _state: BehaviorSubject<'closed' | 'opened'> = new BehaviorSubject<'closed' | 'opened'>('closed');



    // public get state(): 'closed' | 'opened' {

    //     return this._state.getValue();
    // }

    // public get $state(): Observable<'closed' | 'opened'> {

    //     return this._state.asObservable();
    // }

    

    // public open(activeItem: ILightboxItemComponent, items: ILightboxItemComponent[]) {
    //     activeItem.animateHostFixed();
    //     activeItem.animateOrigin().done(()=>{
    //         activeItem.animateCenter();
    //     });
    //     this._pointerEvents = 'auto';
    //     this.header.open();
    //     this.activeItem = activeItem;
    //     this.items = items;
    //     // this.items = items;
    //     // this.activeItem = this.items.find((x) => x.id === activeItem);
    //     // const activeItemIndex = this.items.indexOf(this.activeItem);

    //     // // this.items.forEach((item) => {

    //     // //     const itemIndex = this.items.indexOf(item);

    //     // //     if (itemIndex < activeItemIndex) {
    //     // //         item.position = 'left';
    //     // //     }
    //     // //     if (itemIndex === activeItemIndex) {
    //     // //         item.position = 'origin';
    //     // //     }
    //     // //     if (itemIndex > activeItemIndex) {
    //     // //         item.position = 'right';
    //     // //     }
    //     // // });

    //     // this._checkNavigation();
    //     // this._pointerEvents = 'auto';
    //     // this.fadeAnimator = 'show';
    //     // this._previous.show();
    //     // this._next.show();
    //     // this.headerShowAnimator = 'show';
    // }

    // public close() {

    //     this._pointerEvents = 'none';
    //     this.header.close();
    //     this.items.map((item)=> {item.animateNull()});
    // }

    // public next() {

    //     // const activeItemIndex = this.items.indexOf(this.activeItem);

    //     // if (activeItemIndex >= 0 && activeItemIndex < this.items.length - 1) {
    //     //     this._itemsRef.toArray()[activeItemIndex].changePosition('left');
    //     //     this.activeItem = this.items[activeItemIndex + 1];
    //     //     this._itemsRef.toArray()[activeItemIndex + 1].changePosition('center');
    //     // }
    //     // this._checkNavigation();
    // }

    // public previous() {

    //     // const activeItemIndex = this.items.indexOf(this.activeItem);

    //     // if (activeItemIndex > 0) {
    //     //     this._itemsRef.toArray()[activeItemIndex].changePosition('right');
    //     //     this.activeItem = this.items[activeItemIndex - 1];
    //     //     this._itemsRef.toArray()[activeItemIndex - 1].changePosition('center');
    //     // }
    //     // this._checkNavigation();
    // }

    // public toggle() {

    //     this.header.toggle();
    // }

    // public startFadeAnimator(event: AnimationEvent) {

    //     // if (event.fromState === 'hide') {

    //     //     const activeItemIndex = this.items.indexOf(this.activeItem);

    //     //     this._state.next('opened');
    //     //     this._itemsRef.toArray()[activeItemIndex].changePosition('center');
    //     // }
    // }

    // public doneFadeAnimator(event: AnimationEvent) {

    //     if (event.toState === 'hide') {
    //         this._pointerEvents = 'none';
    //         this._state.next('closed');
    //         this.items = [];
    //         this.activeItem = null;
    //     }
    // }

    // private _checkNavigation() {

    //     const activeItemIndex = this.items.indexOf(this.activeItem);

    //     if (activeItemIndex > 0) {
    //         this.hasPrevious = true;
    //     } else {
    //         this.hasPrevious = false;
    //     }

    //     if (activeItemIndex >= 0 && activeItemIndex < this.items.length - 1) {
    //         this.hasNext = true;
    //     } else {
    //         this.hasNext = false;
    //     }
    // }
}
