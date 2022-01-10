import {Directive, ElementRef, TemplateRef} from '@angular/core';
import {Popover, PopoverRef, Position} from '@finance.workspace/popover';
import {DfControl} from './DfControl';
import {DffControl} from './DffControl';
import {DffValue} from './DffValue';

@Directive()
export abstract class AbstractDffDirective<T> {
  private errorPopoverRef: PopoverRef;
  private dffValue: DffValue;
  dfc: DfControl<T>;

  constructor(
    readonly elementRef: ElementRef,
    readonly popover: Popover,
    readonly fieldControl: DffControl<T>,
  ) {
    this.dffValue = fieldControl.getValue();
  }

  init(control: DfControl<T>) {
    this.dfc = control;
  }

  get f(): T {
    return this.fieldControl.raw;
  }

  get val(): DffValue {
    return this.dffValue;
  }

  get touched() {
    return this.fieldControl.touched;
  }

  get errors() {
    return this.fieldControl.getErrors();
  }

  get invalid(): boolean {
    return this.fieldControl.touched && this.errors.length > 0;
  }

  touch() {
    this.fieldControl.touch();
  }

  changeValue() {
    this.fieldControl.touch();
    this.fieldControl.changeValue(this.val);
  }

  changeFocused(focused: boolean) {
    this.fieldControl.changeFocused(focused);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  afterWriteValue() {}

  writeValue0(value: DffValue) {
    this.dffValue = value;
    this.afterWriteValue();
  }

  scrollToElement(): void {
    this.elementRef.nativeElement.scrollIntoView();
  }

  showErrorOverlay(origin: HTMLDivElement, content: TemplateRef<any>, color: string): void {
    const position = Position.top;
    const hasBackdrop = false;
    this.errorPopoverRef = this.popover.open({ origin, content, position, color, hasBackdrop });
  }

  closeErrorOverlay(): void {
    this.errorPopoverRef?.close();
  }

}
