// import { ISrcBySize } from './iSrcBySize';
// import { ResizedEvent } from './resizedEvent';
// import { ResizeSensor } from 'css-element-queries';

// const WIDTHS = {
//     XS: 0,
//     SM: 576,
//     MD: 768,
//     LG: 992,
//     XL: 1200
// }

// export class LazyLoading {

//     protected srcBySize : ISrcBySize;

//     private _loaded: boolean = false;
  
//     private _oldWidth: number;

//     private _oldHeight: number;
  
//     protected initLazyLoading(nativeElement: any): void {

//       new ResizeSensor(nativeElement, (x) => this._onResized(nativeElement));
//       this._onResized(nativeElement);
//     }
  
//     private _onResized(nativeElement: any): void {

//         console.log('resized');

//         const newWidth = nativeElement.clientWidth;
//         const newHeight = nativeElement.clientHeight;
    
//         if (newWidth === this._oldWidth && newHeight === this._oldHeight) {
//             return;
//         }

//         if (this._loaded && this.srcBySize && this._isInViewPort(nativeElement)) {

//             switch(this._getResolution(newWidth)) {
//                 case 'xs': nativeElement.src = this.srcBySize.xs; break;
//                 case 'sm': nativeElement.src = this.srcBySize.sm; break;
//                 case 'md': nativeElement.src = this.srcBySize.md; break;
//                 case 'lg': nativeElement.src = this.srcBySize.lg; break;
//                 case 'xl': nativeElement.src = this.srcBySize.xl; break;
//             }
//         }
    
//         this._oldWidth = nativeElement.clientWidth;
//         this._oldHeight = nativeElement.clientHeight;
//     }

//     public onLoad(event: Event) {
//         console.log('loaded');
//         this._loaded = true;
//     }

//     public onScroll(event: Event){

//         console.log('scrolling');
//     }

//     private _getResolution(width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' {
        
//         if (width < WIDTHS.SM) {
//             return 'xs';
//         }
//         if (width < WIDTHS.MD) {
//             return 'sm';
//         }
//         if (width < WIDTHS.LG) {
//             return 'md';
//         }
//         if (width < WIDTHS.XL) {
//             return 'lg';
//         }
//         return 'xl';
//     }r

//     _isInViewPort(nativeElement: any) {
    
//         const elSize = (nativeElement.offsetWidth * nativeElement.offsetHeight);
    
//         const rec = nativeElement.getBoundingClientRect();
    
//         const vp = {
//           width: window.innerWidth,
//           height: window.innerHeight
//         };
    
//         const tViz = rec.top >= 0 && rec.top < vp.height;
//         const bViz = rec.bottom > 0 && rec.bottom <= vp.height;
    
//         const lViz = rec.left >= 0 && rec.left < vp.width;
//         const rViz = rec.right > 0 && rec.right <= vp.width;
    
//         const vVisible = tViz || bViz;
//         const hVisible = lViz || rViz;
    
//         return elSize && (vVisible || hVisible);
//       }
// }