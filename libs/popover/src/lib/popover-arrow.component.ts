import {ChangeDetectorRef, Component, HostBinding, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Position} from './position.model';

@Component({
  selector: 'app-popover-arrow',
  template: `
    <!-- 0.2 * arrow_size-->
    <div
      style="width: 0; height: 0; position: relative"
      [style.top]="topIndentPx"
      [style.bottom]="bottomIndentPx"
      [style.right]="rightIndentPx"
      [style.left]="leftIndentPx"
      [style.border-left]="borderLeft"
      [style.border-right]="borderRight"
      [style.border-bottom]="borderBottom"
      [style.border-top]="borderTop"
    ></div>
  `,
  animations: [trigger('dialogContainer', [
    state('void, exit', style({ opacity: 0 })),
    state('enter', style({ transform: 'none' })),
    transition(
      '* => enter',
      animate(
        50, style({ transform: 'none', opacity: 1 }),
      ),
    ),
    transition('* => void, * => exit',
      animate(150, style({ opacity: 0 })),
    ),
  ])],
})
export class PopoverArrowComponent implements OnInit {

  @HostBinding('@dialogContainer') _state: 'void' | 'enter' | 'exit' = 'enter';

  rightIndentPx: string;
  leftIndentPx: string;
  topIndentPx: string;
  bottomIndentPx: string;
  arrowSizePx: string;
  position: Position;
  color: string;

  borderLeft: string;
  borderRight: string;
  borderBottom: string;
  borderTop: string;

  constructor(private readonly cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  _startExitAnimation() {
    this._state = 'exit';

    // Mark the container for check so it can react if the
    // view container is using OnPush change detection.
    this.cd.detectChanges();

  }

  initWithIndent(arrowSize: number, indent: number) {
    this.arrowSizePx = arrowSize + 'px';

    const calculatedMargin = (indent) + 'px';
    if (this.position === Position.left) {
      this.rightIndentPx = calculatedMargin;
      this.borderTop = `${this.arrowSizePx} solid transparent`;
      this.borderBottom = `${this.arrowSizePx} solid transparent`;
      this.borderLeft = `${this.arrowSizePx} solid ${this.color}`;
    }
    if (this.position === Position.right) {
      this.leftIndentPx = calculatedMargin;
      this.borderTop = `${this.arrowSizePx} solid transparent`;
      this.borderBottom = `${this.arrowSizePx} solid transparent`;
      this.borderRight = `${this.arrowSizePx} solid ${this.color}`;
    }

    if (this.position === Position.top) {
      this.bottomIndentPx = calculatedMargin;
      this.borderLeft = `${this.arrowSizePx} solid transparent`;
      this.borderRight = `${this.arrowSizePx} solid transparent`;
      this.borderTop = `${this.arrowSizePx} solid ${this.color}`;
    }

    if (this.position === Position.bottom) {
      this.topIndentPx = calculatedMargin;
      this.borderLeft = `${this.arrowSizePx} solid transparent`;
      this.borderRight = `${this.arrowSizePx} solid transparent`;
      this.borderBottom = `${this.arrowSizePx} solid ${this.color}`;
    }
  }

}
