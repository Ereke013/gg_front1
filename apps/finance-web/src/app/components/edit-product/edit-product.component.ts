import { Component, ComponentRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminController } from '@finance-web/controller/AdminController';
import { Product } from '@finance-web/models/product/Product';
import { TranslateService } from '@ngx-translate/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { ProductParameterForFilter } from '@finance-web/models/product/ProductParameterForFilter';
import { ProductParameter } from '@finance-web/models/product/ProductParameter';
import { DynamicInputComponent } from '@finance-web/app/dynamic-form-fields/dynamic-input/dynamic-input.component';
import { DynamicNumberInputComponent } from '@finance-web/app/dynamic-form-fields/dynamic-number-input/dynamic-number-input.component';
import { DynamicPercentageInputComponent } from '@finance-web/app/dynamic-form-fields/dynamic-percentage-input/dynamic-percentage-input.component';
import { DynamicDictSelectComponent } from '@finance-web/app/dynamic-form-fields/dynamic-dict-select/dynamic-dict-select.component';
import { DynamicRangePeriodComponent } from '@finance-web/app/dynamic-form-fields/dynamic-range-period/dynamic-range-period.component';
import { DynamicDictMultipleSelectComponent } from '@finance-web/app/dynamic-form-fields/dynamic-dict-multiple-select/dynamic-dict-multiple-select.component';
import { DynamicRangeCashComponent } from '@finance-web/app/dynamic-form-fields/dynamic-range-cash/dynamic-range-cash.component';
import { DynamicCalcComponent } from '@finance-web/app/dynamic-form-fields/dynamic-calc/dynamic-calc.component';
import { ComboBoxComponent } from '@finance-web/app/components/combo-box/combo-box.component';
import { DynamicCommissionComponent } from '@finance-web/app/dynamic-form-fields/dynamic-commission/dynamic-commission.component';
import { ParameterType } from '@finance-web/models/product/ParameterType';
import { DynamicDateSelectorComponent } from '@finance-web/app/dynamic-form-fields/dynamic-date-selector/dynamic-date-selector.component';
import { DynamicDictRegionCitySelectComponent } from '@finance-web/app/dynamic-form-fields/dynamic-dict-region-city-select/dynamic-dict-region-city-select.component';
import {DynamicDictCreditSelectComponent} from "@finance-web/app/dynamic-form-fields/dynamic-dict-credit-select/dynamic-dict-credit-select.component";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  buttonName: any;
  titleName: any;
  product: Product;
  productToReturn: Product;
  productForm: FormGroup;
  checkPeriodOnValidate: boolean = true;

  tmpParameterArray: ProductParameter[];

  constructor(private dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public id,
              private fb: FormBuilder,
              private adminController: AdminController,
              private translateService: TranslateService) {

    this.productForm = this.fb.group({

      displayTitleRu: ['', Validators.required],
      displayTitleEn: [''],
      displayTitleKk: [''],
      code: [''],

      parameters: fb.array([])

    });

    this.buttonName = id == null ? this.translateService.instant('add') : this.translateService.instant('edit');
    this.titleName = id == null ? this.translateService.instant('add_title') : this.translateService.instant('edit_title');
  }

  ngOnInit(): void {

    if (this.id != null) {
      this.adminController.getProductDetail(this.id).then(res => {
        this.product = res;
        this.product.parameters = this.product.parameters.filter(f => f.parameterType !== ParameterType.CALC);
        this.productForm.patchValue(this.product);

        this.tmpParameterArray = res.parameters;
        this.product.parameters = [];

        for (const p of this.tmpParameterArray) {

          if (p.paramValue == null && p.parentId != null) {
            continue;
          }
          this.product.parameters.push(p);
          this.parametersFormArray.push(new FormControl(p.paramValue));
          if (p.parameterType === ParameterType.DICT || p.parameterType === ParameterType.COMBO_DICT) {
            const dict = { dict: 'nothingIsChosen', displayTitle: 'Не выбрано' };
            p.dictList.splice(0, 0, dict);
          }
        }

        this.putLevelToParameters(this.product.parameters);
      });
    }
  }

  putLevelToParameters(params: ProductParameter[]) {
    for (let p of params) {
      if (p.parentId == null) {
        p.level = 1;
        continue;
      }

      let parent = params.find(par => par.parameterId === p.parentId);

      if (parent != null) {
        p.level = parent.level + 1;
      }
    }
  }

  get parametersFormArray() {
    return this.productForm.controls.parameters as FormArray;
  }

  validation() {
    return this.productForm.valid && this.checkPeriodOnValidate;

  }

  submit() {

    this.productToReturn = this.productForm.getRawValue();

    for (let i = 0; i < this.parametersFormArray.controls.length; i++) {
      if (this.parametersFormArray.controls[i] != null) {
        this.product.parameters[i].paramValue = this.parametersFormArray.controls[i].value;
      }
    }

    if (this.id != null) {
      this.productToReturn.id = this.id;
      this.productToReturn.parameters = this.product.parameters;

      this.tmpParameterArray = this.distinctParamArray(this.tmpParameterArray);

      this.tmpParameterArray.forEach(tmp => {
        if (this.product.parameters.find(p => p.parameterId === tmp.parameterId) == null) {
          tmp.paramValue = null;
        } else {
          tmp.paramValue = this.product.parameters.find(p => p.parameterId === tmp.parameterId).paramValue;
        }
      });

      this.productToReturn.parameters = this.tmpParameterArray;

    }

    this.dialogRef.close(this.productToReturn);
  }

  distinctParamArray(params: ProductParameter[]): ProductParameter[] {

    let flags = [], output = [], l = params.length, i;

    for (i = 0; i < l; i++) {
      if (flags[params[i].parameterId]) continue;
      flags[params[i].parameterId] = true;
      output.push(params[i]);
    }

    return output;
  }

  closeHandler() {
    this.dialogRef.close(null);
  }

  dictSelected(event: MatOptionSelectionChange, dictValueCode: string, parentParameter: ProductParameter) {
    if (event.isUserInput) {
      this.adminController.getProductParametersForFilter(dictValueCode, parentParameter.parameterId).then(res => {
        this.updateParameterList(res, parentParameter);
      });
    }
  }

  private updateParameterList(list: ProductParameterForFilter[], parentParameter: ProductParameter) {

    this.cleanUpParametersAfterSelectChange(parentParameter);

    for (const l of list) {
      l.level = parentParameter.level + 1;

      if (this.product.parameters.find(p => p.parameterId === l.id) == null) {

        const tmpProduct = {
          parameterId: l.id,
          parameterType: l.type,
          displayTitle: l.title,
          paramValue: l.value,
          filterType: null,
          isDisplayable: null,
          isVisibleToFo: null,
          isDisplayableInApplicationCard: null,
          level: l.level,
          parentId: parentParameter.parameterId,
          dictList: l.dictList
        };

        this.tmpParameterArray.push(tmpProduct);
        this.product.parameters.push(tmpProduct);

        this.parametersFormArray.push(new FormControl(l.value));
      }
    }
  }

  private cleanUpParametersAfterSelectChange(parentParameter: ProductParameter) {
    for (let i = this.product.parameters.length - 1; i >= 0; i--) {
      if (this.product.parameters[i].level >= (parentParameter.level + 1)
        && this.isParameterChild(this.product.parameters[i], parentParameter)) {

        this.product.parameters.splice(i, 1);
        this.parametersFormArray.controls.splice(i, 1);
      }
    }
    this.removeParameterWithNoParent();
  }

  private removeParameterWithNoParent() {
    for (let i = this.product.parameters.length - 1; i >= 0; i--) {
      if (this.product.parameters.find(pp => pp.parameterId === this.product.parameters[i].parentId) == null
        && this.product.parameters[i].parentId != null) {

        this.product.parameters.splice(i, 1);
        this.parametersFormArray.controls.splice(i, 1);
      }
    }
  }

  isParameterChild(parameter: ProductParameter, parentParameter: ProductParameter): boolean {
    return (parameter.parentId === parentParameter.parameterId);
  }

  dictFieldClicked(productParameter: ProductParameter) {

    if (productParameter.dictList.length < 1) {
      this.adminController.getParameterDictValues(productParameter.parameterId).then(res => {
        productParameter.dictList = res;
      });
    }
  }

  getComponent(componentRef: ComponentRef<any>, parameter: ProductParameter, formControl: AbstractControl) {
    switch (componentRef.componentType) {
      case DynamicRangePeriodComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.formControl = formControl;

        componentRef.instance.checkPeriodDate.subscribe(check => {
          this.checkPeriodOnValidate = check;
          this.validation();
        });
        break;

      case DynamicDateSelectorComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.formControl = formControl;
        componentRef.instance.parameterType = parameter.parameterType;
        componentRef.instance.dictList = parameter.dictList;
        componentRef.instance.prefixDictList = parameter.prefixDictList;
        break;

      case DynamicInputComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.formControl = formControl;
        componentRef.instance.parameterType = parameter.parameterType;
        break;

      case DynamicCalcComponent:
      case DynamicNumberInputComponent:
      case DynamicPercentageInputComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.formControl = formControl;
        break;

      case ComboBoxComponent:
      case DynamicDictSelectComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.formControl = formControl;
        componentRef.instance.dictList = parameter.dictList;

        componentRef.instance.fieldClicked.subscribe(fieldClicked => {
          if (fieldClicked) {
            this.dictFieldClicked(parameter);
          }
        });
        componentRef.instance.optionSelected.subscribe(data => {
          this.dictSelected(data.event, data.dictValueCode, parameter);
        });

        componentRef.instance.foSelected.subscribe(data => {
          if (data.label === 'Финансовая организация') {
            this.productForm.get('code').setValue(data.value);
          }
        });
        break;

      case DynamicDictRegionCitySelectComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.formControl = formControl;
        break;
      case DynamicDictMultipleSelectComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.dictList = parameter.dictList;
        componentRef.instance.formControl = formControl;
        break;

      case DynamicDictCreditSelectComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.placeholder = parameter.displayTitle;
        componentRef.instance.dictList = parameter.dictList;
        componentRef.instance.formControl = formControl;
        componentRef.instance.prefixDictList = parameter.prefixDictList;
        break;

      case DynamicRangeCashComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.formControl = formControl;

        break;

      case DynamicCommissionComponent:
        componentRef.instance.label = parameter.displayTitle;
        componentRef.instance.formControl = formControl;
        break;
    }
  }
}
