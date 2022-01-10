import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormFieldsComponent} from "./dynamic-form-fields.component";
import {DynamicNumberInputComponent} from './dynamic-number-input/dynamic-number-input.component';
import {DynamicPercentageInputComponent} from './dynamic-percentage-input/dynamic-percentage-input.component';
import {DynamicInputComponent} from './dynamic-input/dynamic-input.component';
import {DynamicDictSelectComponent} from './dynamic-dict-select/dynamic-dict-select.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {DynamicFormFieldDirective} from "@finance-web/directives/dynamic-form-field.directive";
import {DynamicRangePeriodComponent} from "@finance-web/app/dynamic-form-fields/dynamic-range-period/dynamic-range-period.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {TranslateModule} from "@ngx-translate/core";
import {DynamicDictMultipleSelectComponent} from "@finance-web/app/dynamic-form-fields/dynamic-dict-multiple-select/dynamic-dict-multiple-select.component";
import {DynamicRangeCashComponent} from "@finance-web/app/dynamic-form-fields/dynamic-range-cash/dynamic-range-cash.component";
import {DynamicCalcComponent} from "@finance-web/app/dynamic-form-fields/dynamic-calc/dynamic-calc.component";
import {DynamicCommissionComponent} from "@finance-web/app/dynamic-form-fields/dynamic-commission/dynamic-commission.component";
import {DynamicDateSelectorComponent} from "@finance-web/app/dynamic-form-fields/dynamic-date-selector/dynamic-date-selector.component";
import {DynamicDictRegionCitySelectComponent} from "@finance-web/app/dynamic-form-fields/dynamic-dict-region-city-select/dynamic-dict-region-city-select.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxMaskModule} from "ngx-mask";
import {DynamicDictCreditSelectComponent} from "@finance-web/app/dynamic-form-fields/dynamic-dict-credit-select/dynamic-dict-credit-select.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    DynamicFormFieldsComponent,
    DynamicNumberInputComponent,
    DynamicPercentageInputComponent,
    DynamicInputComponent,
    DynamicDictSelectComponent,
    DynamicFormFieldDirective,
    DynamicRangePeriodComponent,
    DynamicDictMultipleSelectComponent,
    DynamicRangeCashComponent,
    DynamicCalcComponent,
    DynamicCommissionComponent,
    DynamicDateSelectorComponent,
    DynamicDictRegionCitySelectComponent,
    DynamicDictCreditSelectComponent
  ],
    exports: [
        DynamicFormFieldsComponent,
        DynamicDictMultipleSelectComponent,
        DynamicRangePeriodComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatDatepickerModule,
        TranslateModule,
        FormsModule,
        MatTooltipModule,
        NgxMaskModule,
        MatIconModule,
    ]
})
export class DynamicFormFieldsModule {
}
