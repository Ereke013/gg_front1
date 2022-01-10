import {ComponentRef, Injectable, Injector, TemplateRef} from '@angular/core';
import {ConnectionPositionPair, Overlay, OverlayConfig, OverlayRef, PositionStrategy} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {PopoverParams} from './popover-params.model';
import {POPOVER_DATA, PopoverRef} from './popover-ref';
import {PopoverComponent} from './popover.component';
import {PopoverArrowComponent} from './popover-arrow.component';
import {Position} from './position.model';

@Injectable()
export class Popover {

  constructor(
    private readonly overlay: Overlay,
    private readonly injector: Injector,
  ) {}

  open<RESULT = any>({
                       origin, content, position, color, hasBackdrop,
                       needArrow, arrowSize, indentSize, withPush,
                       data, injector, xOffset, yOffset, viewportMargin,
                     }: PopoverParams): PopoverRef<RESULT> {

    needArrow = needArrow ?? true;
    withPush = withPush ?? true;
    viewportMargin = viewportMargin ?? 0;

    if (needArrow) {
      indentSize = indentSize ?? 10;
      arrowSize = arrowSize ?? 10;
    } else {
      indentSize = 0;
      arrowSize = 0;
    }

    color = color ?? 'white';

    const overlayRef = this.overlay.create(this.getOverlayConfig(origin, position, hasBackdrop, withPush, xOffset, yOffset, viewportMargin));

    const popoverRef = new PopoverRef<RESULT>(overlayRef);

    const innerInjector = Injector.create({
      parent: injector ? injector : this.injector,
      providers: [
        { provide: POPOVER_DATA, useValue: data },
        { provide: PopoverRef, useValue: popoverRef },
        { provide: OverlayRef, useValue: overlayRef },
      ],
    });
    const cr = overlayRef.attach(new ComponentPortal(PopoverComponent, null, innerInjector));

    cr.instance.content = content;
    cr.instance.templateMode = content instanceof TemplateRef;
    cr.instance.position = position;
    cr.instance.needArrow = needArrow;
    cr.instance.color = color;
    cr.instance.init(arrowSize, indentSize);
    let arrowRef: OverlayRef;
    let acr: ComponentRef<PopoverArrowComponent>;
    if (needArrow) {
      arrowRef = this.createArrowOverlay(origin, position);
      acr = arrowRef.attach(new ComponentPortal(PopoverArrowComponent));
      acr.instance.color = color;
      acr.instance.position = position;
      acr.instance.initWithIndent(arrowSize, indentSize);

      // if popover-arrow is on popover - hide arrow
      setTimeout(() => {
        const arrowRect = arrowRef.overlayElement.getBoundingClientRect();
        const popoverRect = overlayRef.overlayElement.getBoundingClientRect();

        if (position === Position.right) {
          if ((popoverRect.x + arrowRect.width) < arrowRect.x) {
            arrowRef.dispose();
          }
        } else if (position === Position.left) {
          if ((popoverRect.x + arrowRect.width) > arrowRect.x) {
            arrowRef.dispose();
          }
        } else if (position === Position.bottom) {
          if ((popoverRect.y + arrowRect.height) < arrowRect.y) {
            arrowRef.dispose();
          }
        } else if (position === Position.top) {
          if ((popoverRect.y + arrowRect.height) > arrowRect.y) {
            arrowRef.dispose();
          }
        }
      });
    }

    popoverRef.arrowRef = arrowRef;
    popoverRef.componentInstance = cr.instance;
    if (needArrow) {
      popoverRef.arrowInstance = acr.instance;
    }

    popoverRef.updatePosition();

    return popoverRef;

  }

  private createArrowOverlay(origin, position): OverlayRef {
    return this.overlay.create(new OverlayConfig({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().flexibleConnectedTo(origin)
                            .withPositions(getPositions(position))
                            .withPush(false),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    }));
  }

  private getOverlayConfig(
    origin: HTMLElement,
    position: Position,
    hasBackdrop: boolean,
    withPush: boolean,
    xOffset: number,
    yOffset: number,
    viewportMargin: number,
  ): OverlayConfig {
    return new OverlayConfig({
      disposeOnNavigation: true,
      hasBackdrop: hasBackdrop,
      backdropClass: 'popover-backdrop',
      positionStrategy: this.getOverlayPosition(origin, position, withPush, xOffset, yOffset, viewportMargin),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
  }

  private getOverlayPosition(
    origin: HTMLElement,
    position: Position,
    withPush: boolean,
    xOffset: number,
    yOffset: number,
    viewportMargin: number,
  ): PositionStrategy {
    return this.overlay.position()
               .flexibleConnectedTo(origin)
               .withGrowAfterOpen(true)
               .withPositions(getPositions(position))
               .withPush(withPush)
               .withFlexibleDimensions(false)
               .withDefaultOffsetY(yOffset)
               .withDefaultOffsetX(xOffset)
               .withViewportMargin(viewportMargin)
      ;
  }

}

function getPositions(position: Position): ConnectionPositionPair[] {

  if (position === Position.left) {
    return [{
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
    }];
  }

  if (position === Position.right) {
    return [{
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
    }];
  }

  if (position === Position.bottom) {
    return [{
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
    }];
  }

  if (position === Position.top) {
    return [{
      originX: 'center',
      originY: 'top',
      overlayX: 'center',
      overlayY: 'bottom',
    }];
  }

  return [{
    originX: 'center',
    originY: 'bottom',
    overlayX: 'center',
    overlayY: 'top',
  }];
}
