import {Component, HostBinding, NgModule, OnInit} from '@angular/core';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzTimePickerModule} from 'ng-zorro-antd/time-picker';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {DffValueDateAt} from '@finance.workspace/shared/model';

@Component({
  templateUrl: './dff-date-at.component.html',
  styleUrls: ['./dff-date-at.component.scss'],
})
export class DffDateAtComponent extends AbstractDffDirectiveFormField implements OnInit {

  size = 2;
  format = 'dd.MM.yyyy HH:mm';
  datePlaceholder = 'full_date';

  dateValue: Date;

  ngOnInit() {
    if (!super.val.isEmpty()) {
      this.dateValue = this.val.value;
      return;
    }

    this.dateValue = new Date();
  }

  get val(): DffValueDateAt {
    return super.val;
  }

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }
}

@NgModule({
  declarations: [DffDateAtComponent],
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
