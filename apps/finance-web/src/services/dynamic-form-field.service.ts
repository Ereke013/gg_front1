import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {ParameterType} from "../models/product/ParameterType";

@Injectable({providedIn: 'root'})
export class DynamicFormFieldService {

  constructor(private cfr: ComponentFactoryResolver) {
  }

  async loadComponent(vcr: ViewContainerRef, parameterType: ParameterType) {

    vcr.clear();

    switch (parameterType) {
      case ParameterType.DOUBLE:
      case ParameterType.INT:
      case ParameterType.LONG:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-number-input/dynamic-number-input.component")
              .then(x => x.DynamicNumberInputComponent)
          )
        );

      case ParameterType.PERCENTAGE:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-percentage-input/dynamic-percentage-input.component")
              .then(x => x.DynamicPercentageInputComponent)
          )
        );

      case ParameterType.DESCRIPTION:
      case ParameterType.STR:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-input/dynamic-input.component").then(x => x.DynamicInputComponent)
          )
        );

      case ParameterType.COMBO_DICT:
      case ParameterType.DICT:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-dict-select/dynamic-dict-select.component").then(x => x.DynamicDictSelectComponent)
          )
        );
      case ParameterType.PERIOD:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-range-period/dynamic-range-period.component").then(x => x.DynamicRangePeriodComponent)
          )
        );
      case ParameterType.SELECTOR:
      case ParameterType.MULTI_DICT:
      case ParameterType.NOT_MULTI_DICT:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-dict-multiple-select/dynamic-dict-multiple-select.component").then(x => x.DynamicDictMultipleSelectComponent)
          )
        );
      case ParameterType.RANGE:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-range-cash/dynamic-range-cash.component").then(x => x.DynamicRangeCashComponent)
          )
        );
      case ParameterType.CALC:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-calc/dynamic-calc.component").then(x => x.DynamicCalcComponent)
          )
        );
      case ParameterType.COMMISSION:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-commission/dynamic-commission.component").then(x => x.DynamicCommissionComponent)
          )
        );

      case ParameterType.DATE_SELECTOR:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-date-selector/dynamic-date-selector.component").then(x => x.DynamicDateSelectorComponent)
          )
        );
      case ParameterType.REGION_SELECTOR:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-dict-region-city-select/dynamic-dict-region-city-select.component").then(x => x.DynamicDictRegionCitySelectComponent)
          )
        );

      case ParameterType.DICT_CREDIT_HISTORY:
        return vcr.createComponent(
          this.cfr.resolveComponentFactory(
            await import("../app/dynamic-form-fields/dynamic-dict-credit-select/dynamic-dict-credit-select.component").then(x => x.DynamicDictCreditSelectComponent)
          )
        );
    }
  }
}
