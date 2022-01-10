import {Component, HostBinding, NgModule} from '@angular/core';
import {DffValuePeriodTime} from '@finance.workspace/shared/model';
import {CommonModule} from '@angular/common';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {FormsModule} from '@angular/forms';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';

@Component({
  selector: 'app-dff-period-time',
  templateUrl: './dff-period-time.component.html',
  styleUrls: ['./dff-period-time.component.scss'],
})
export class DffPeriodTimeComponent extends AbstractDffDirectiveFormField {

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }

  get val(): DffValuePeriodTime {
    return super.val;
  }

  onChange(dates: Date[]) {
    this.val.value = dates;
    this.changeValue();
  }

  openChanged(isOpened: boolean) {
    if (isOpened) {
      return;
    }

    this.touch();
  }

}

@NgModule({
  declarations: [DffPeriodTimeComponent],
  imports: [
    CommonModule,
    NzDatePickerModule,
    FormsModule,
    DffLabelModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
