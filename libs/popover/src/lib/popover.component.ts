import {ChangeDetectorRef, Component, HostBinding, Injector} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PopoverContent} from './popover-ref';
import {Position} from './position.model';

@Component({
  selector: 'app-popover',
  template: `
    <!--  0.3 * arrow size -->
    <div
      style="position:relative;"
      [style.right]="marginRightPx"
      [style.left]="marginLeftPx"
      [style.top]="marginTopPx"
      [style.bottom]="marginBottomPx"
    >
      <ng-container *ngIf="templateMode">
        <ng-container *ngTemplateOutlet="content;"></ng-container>
      </ng-container>

      <ng-container *ngIf="!templateMode">
        <ng-container *ngComponentOutlet="content; injector: injector;"></ng-container>
      </ng-container>
    </div>
  `,
  styles: [
    `:host {
        display: block;
        height: fit-content;
    }`,
  ],
  animations: [
    trigger('dialogContainer', [
      state('void, exit', style({ opacity: 0, transform: 'scaleY(0.7)' })),
      state('enter', style({ transform: 'none' })),
      transition('* => enter',
        animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 })),
      ),
      transition('* => void, * => exit',
        animate('150ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'scaleY(0)' })),
      ),
    ]),
  ],
})
export class PopoverComponent {

  @HostBinding('@dialogContainer') _state: 'void' | 'enter' | 'exit' = 'enter';

  content: PopoverContent;
  templateMode = true;
  position: Position;
  color = 'white';
  needArrow = true;
  arrowSizePx = '10px';
  marginRightPx: string;
  marginLeftPx: string;
  marginTopPx: string;
  marginBottomPx: string;

  constructor(private readonly cd: ChangeDetectorRef,
              public readonly injector: Injector) {
  }

  /** Starts the dialog exit animation.
   * @return animation length
   */
  _startExitAnimation(): number {
    this._state = 'exit';

    // Mark the container for check so it can react if the
    // view container is using OnPush change detection.
    this.cd.detectChanges();

    return 150;
  }

  init(arrowSize: number, indentSize: number) {
    this.arrowSizePx = arrowSize + 'px';

    const calculatedMargin = indentSize + arrowSize;
    const calculatedMarginPx = calculatedMargin + 'px';
    if (this.position === Position.left) {
      this.marginRightPx = calculatedMarginPx;
    }

    if (this.position === Position.right) {
      this.marginLeftPx = calculatedMarginPx;
    }

    if (this.position === Position.top) {
      this.marginTopPx = (-1 * calculatedMargin) + 'px';
    }

    if (this.position === Position.bottom) {
      this.marginTopPx = calculatedMarginPx;
    }

  }
}
