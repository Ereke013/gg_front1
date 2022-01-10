import {Component, Input, OnDestroy, TemplateRef} from '@angular/core';
import {BoFieldType, FormField} from '@finance.workspace/shared/model';
import {Popover, PopoverRef, Position} from '@finance.workspace/popover';
import {DffValue} from '@finance.workspace/dynamic-form';

@Component({
  selector: 'app-dff-label',
  templateUrl: './dff-label.component.html',
  styleUrls: ['./dff-label.component.scss'],
})
export class DffLabelComponent implements OnDestroy {

  @Input() field: FormField;
  @Input() value: DffValue;
  @Input() showLabel: boolean = true;
  @Input() oneLineMode: boolean = false;
  @Input() showInvalidIcon: boolean = true;
  @Input() showRequiredIcon: boolean = true;
  @Input() touched: boolean = false;
  @Input() errors: string[] = [];
  BoFieldType = BoFieldType;
  private errorPopoverRef: PopoverRef;

  constructor(
    private readonly popover: Popover,
  ) {}

  ngOnDestroy(): void {
    this.errorPopoverRef?.close();
  }

  showErrorOverlay(origin: HTMLDivElement, content: TemplateRef<any>) {
    const position = Position.top;
    const hasBackdrop = false;
    this.errorPopoverRef = this.popover.open({ origin, content, position, hasBackdrop });
  }

  closeErrorOverlay() {
    this.errorPopoverRef.close();
  }

}
