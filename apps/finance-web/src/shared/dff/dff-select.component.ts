import {Component, ElementRef, HostBinding, NgModule, TemplateRef, ViewChild} from '@angular/core';
import {DffValueDropdownSingle, FieldOption} from '@finance.workspace/shared/model';
import {PopoverRef, Position} from '@finance.workspace/popover';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MybpmLinkModule} from '@finance.workspace/mybpm-link';
import {TranslateModule} from '@ngx-translate/core';
import {OverlaySingleSelectModule} from '@finance.workspace/overlay-single-select';
import {FlexModule} from '@angular/flex-layout';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';
import {UiChipModule} from '@finance.workspace/ui/chip';

@Component({
  templateUrl: './dff-select.component.html',
  styleUrls: ['./dff-select.component.scss'],
})
export class DffSelectComponent extends AbstractDffDirectiveFormField {

  @ViewChild('vertDotsOrigin') vertDotsOrigin: ElementRef<HTMLElement>;

  selectedOption: FieldOption;

  private popoverRef: PopoverRef;

  afterWriteValue() {
    this.selectedOption = this.f.options.find((option:any) => option.id === this.val.optionId);
  }

  get val(): DffValueDropdownSingle {
    return super.val;
  }

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }

  updateValue(option: FieldOption) {
    this.val.optionId = option.id;
    this.selectedOption = option;
    this.changeValue();
    this.closePopover();
  }

  openPopover(origin: HTMLElement, content: TemplateRef<any>) {
    const hasBackdrop = true;
    const position = Position.right;
    this.popoverRef = this.popover.open({ origin, content, hasBackdrop, position });
  }

  closePopover() {
    if (this.popoverRef) {
      this.popoverRef.close();
    }
  }

  closeOption() {
    this.selectedOption = undefined;
    this.val.optionId = undefined;
    this.changeValue();
  }

  openVertDotsPopover(optionChooser: TemplateRef<any>) {
    if (!this.vertDotsOrigin) {
      return;
    }

    this.openPopover(this.vertDotsOrigin.nativeElement, optionChooser);
  }
}

@NgModule({
  declarations: [DffSelectComponent],
  imports: [
    CommonModule,
    UiChipModule,
    MatIconModule,
    MybpmLinkModule,
    TranslateModule,
    OverlaySingleSelectModule,
    FlexModule,
    DffLabelModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
