// import { Directive, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
// import { ResizeSensor } from 'css-element-queries';
// import { ResizedEvent } from '../../models/resizedEvent';

// @Directive({
//   selector: '[resized]'
// })
// export class ResizedDirective implements OnInit {

//   @Output('resized')
//   readonly resized = new EventEmitter<ResizedEvent>();

//   private _oldWidth: number;
//   private _oldHeight: number;

//   constructor(private readonly element: ElementRef) {
//   }

//   ngOnInit(): void {
//     new ResizeSensor(this.element.nativeElement, (x) => this.onResized());
//     this.onResized();
//   }

//   private onResized(): void {
//     const newWidth = this.element.nativeElement.clientWidth;
//     const newHeight = this.element.nativeElement.clientHeight;

//     if (newWidth === this._oldWidth && newHeight === this._oldHeight) {
//       return;
//     }

//     const event = new ResizedEvent(
//       this.element,
//       newWidth,
//       newHeight,
//       this._oldWidth,
//       this._oldHeight);

//     this._oldWidth = this.element.nativeElement.clientWidth;
//     this._oldHeight = this.element.nativeElement.clientHeight;

//     this.resized.next(event);
//   }

// }


