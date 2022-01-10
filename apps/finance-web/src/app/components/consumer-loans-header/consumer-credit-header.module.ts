import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {ConsumerCreditHeaderComponent} from './consumer-credit-header.component';
import {DynamicFormFieldsModule} from "@finance-web/app/dynamic-form-fields/dynamic-form-fields.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [ConsumerCreditHeaderComponent],
  exports: [
    ConsumerCreditHeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule,
    DynamicFormFieldsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ConsumerCreditHeaderModule {
}
