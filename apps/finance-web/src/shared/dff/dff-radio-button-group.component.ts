import {Component, HostBinding, NgModule} from '@angular/core';
import {DffValueRadioButtonGroup} from '@finance.workspace/shared/model';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';
import {UiRadioModule} from '@finance.workspace/ui/radio';
import {FormsModule} from '@angular/forms';

@Component({
  templateUrl: './dff-radio-button-group.component.html',
  styleUrls: ['./dff-radio-button-group.component.scss'],
})
export class DffRadioButtonGroupComponent extends AbstractDffDirectiveFormField {

  get val(): DffValueRadioButtonGroup {
    return super.val;
  }

  changed(value: string) {
    this.val.optionId = value;
    this.changeValue();
  }

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }
}

@NgModule({
  declarations: [DffRadioButtonGroupComponent],
  imports: [
    CommonModule,
    UiRadioModule,
    FlexModule,
    DffLabelModule,
    FormsModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
