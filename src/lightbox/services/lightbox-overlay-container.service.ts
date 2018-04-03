import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class LightboxOverlayContainerService {
  protected _containerElement: HTMLElement;

  constructor(@Inject(DOCUMENT) private _document: any) {}

  public destroy() {
    if (this._containerElement && this._containerElement.parentNode) {
      this._containerElement.parentNode.removeChild(this._containerElement);
    }
  }

  public getContainerElement(): HTMLElement {
    if (!this._containerElement) { this._createContainer(); }
    return this._containerElement;
  }

  private _createContainer(): void {
    const container = this._document.createElement('div');

    container.classList.add('lightbox-overlay-container');
    this._document.body.appendChild(container);
    this._containerElement = container;
  }
}
