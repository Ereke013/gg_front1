import {InjectionToken, TemplateRef} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ComponentType, OverlayRef} from '@angular/cdk/overlay';
import {PopoverComponent} from './popover.component';
import {PopoverArrowComponent} from './popover-arrow.component';

export const POPOVER_DATA = new InjectionToken<any>('POPOVER_DATA');

export type PopoverContent = TemplateRef<any> | ComponentType<any>;

export class PopoverRef<T = any> {
  backdropDisabled: boolean = false;
  arrowInstance: PopoverArrowComponent;
  componentInstance: PopoverComponent;

  private _afterClosed = new Subject<T>();
  private _beforeClosed = new Subject<T>();
  private closed = false;
  public beforeClosed: Observable<T> = this._beforeClosed.asObservable();
  public afterClosed: Observable<T> = this._afterClosed.asObservable();

  constructor(private readonly overlay: OverlayRef,
              public arrowRef?: OverlayRef) {
    overlay.backdropClick().subscribe(() => {
      if (this.backdropDisabled) {
        return;
      }
      this._close();
    });
  }

  onBackdropClick(): Observable<MouseEvent> {
    return this.overlay.backdropClick();
  }

  close(data?: T) {
    this._close(data);
  }

  isOutOfWindow(): boolean {
    const overlayElement = this.overlay.overlayElement;
    const bounding = overlayElement.getBoundingClientRect();
    return bounding.top < 0
      || bounding.left < 0
      || bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)
      || bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  }

  updatePosition() {
    setTimeout(() => this.overlay.updatePosition());
  }

  private _close(data?: any) {
    if (this.closed) { return; }
    this.closed = true;
    this._beforeClosed.next(data);
    this._beforeClosed.complete();
    const ms = this.componentInstance._startExitAnimation();
    if (this.arrowInstance) {this.arrowInstance._startExitAnimation(); }
    setTimeout(() => {
      this.overlay.dispose();
      if (this.arrowRef) { this.arrowRef.dispose(); }
      this._afterClosed.next(data);
      this._afterClosed.complete();
    }, ms);
  }
}
