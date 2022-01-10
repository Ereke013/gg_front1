import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {BoFieldType, DffValueDate} from '@finance.workspace/shared/model';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {CommonModule} from '@angular/common';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';

@Component({
  templateUrl: './dff-date-and-time.component.html',
  styleUrls: ['./dff-date-and-time.component.scss'],
})
export class DffDateAndTimeComponent extends AbstractDffDirectiveFormField implements OnInit {

  year = false;
  time = false;
  date = false;
  size = 2;
  format: string;
  datePlaceholder = 'date';

  ngOnInit() {
    this.setComponentsOfDate(this.f.type);
  }

  get val(): DffValueDate {
    return super.val;
  }

  get isFullDate() {
    return this.f.type === BoFieldType.FULL_DATE;
  }

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }

  setComponentsOfDate(value: BoFieldType) {

    if (BoFieldType.YEAR === value) {
      this.year = true;
    }

    if (BoFieldType.TIME === value) {
      this.time = true;
    }

    if (BoFieldType.YEAR_AND_MONTH === value) {
      this.date = true;
      this.format = 'MM.yyyy';
      this.datePlaceholder = 'year_and_month';
    }

    if (BoFieldType.DATE === value) {
      this.date = true;
      this.format = 'dd.MM.yyyy';
      this.datePlaceholder = 'date';
    }

    if (BoFieldType.FULL_DATE === value) {
      this.date = true;
      this.format = 'dd.MM.yyyy HH:mm';
      this.datePlaceholder = 'full_date';
    }

  }

  changeTouched(isOpened: boolean) {
    if (isOpened) {
      return;
    }
    this.touch();
  }

  updateValue() {
    this.changeValue();
  }
}

@NgModule({
  declarations: [DffDateAndTimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    NzDatePickerModule,
    NzTimePickerModule,
    DffLabelModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
