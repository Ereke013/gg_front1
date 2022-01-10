import {Component, Inject, OnInit} from '@angular/core';
import {ProductParameterToSave} from '@finance-web/models/product/ProductParameterToSave';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParameterType} from '@finance-web/models/product/ParameterType';
import {MatSelectChange} from '@angular/material/select';
import {TranslateService} from '@ngx-translate/core';
import {AdminController} from '@finance-web/controller/AdminController';
import {Dict} from '@finance-web/models/dict/Dict';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {SelectItem} from '@finance-web/models/help/SelectItem';

@Component({
  selector: 'app-edit-product-parameters',
  templateUrl: './edit-product-parameters.component.html',
  styleUrls: ['./edit-product-parameters.component.scss']
})
export class EditProductParametersComponent implements OnInit {

  buttonName: any;
  titleName: any;
  parameter: ProductParameterToSave;

  dictForSelect: Dict[];
  dictValueForSelect: Dict[];

  parameterForm: FormGroup;
  parameterToReturn: ProductParameterToSave;

  isDictSelected: boolean = false;
  isMultipleDictSelected: boolean = false;
  isComboDictSelected: boolean = false;
  isSelector: boolean = false;
  isSubParameterChecked: boolean = false;
  isSortBox: boolean = false;

  parameterSelect: SelectItem;

  errorSort: string = '';

  paramForFilter = new FormControl('');
  dictList: Dict[] = [];

  constructor(private dialogRef: MatDialogRef<EditProductParametersComponent>,
              @Inject(MAT_DIALOG_DATA) private id,
              private fb: FormBuilder,
              private translateService: TranslateService,
              private adminController: AdminController) {

    this.parameterForm = this.fb.group({
      displayTitleEn: [''],
      displayTitleRu: ['', Validators.required],
      displayTitleKk: [''],
      tableName: ['', Validators.required],
      type: ['', Validators.required],

      dictTable: [''],

      isFilter: [false],
      isSorting: [false],
      isSubParameter: [false],
      parameterRef: [null],
      dictCodeColumn: [null],
      filterType: ['']
    });

    this.buttonName = id == null ? this.translateService.instant('add') : this.translateService.instant('edit');
    this.titleName = id == null ? this.translateService.instant('add_title') : this.translateService.instant('edit_title');
  }

  ngOnInit(): void {

    this.adminController.getFilterTypes().then(res => {
      this.dictList = res;
    });

    if (this.id != null) {
      this.adminController.getProductParameterDetail(this.id).then(res => {
        this.parameter = res;
        this.parameterForm.patchValue(this.parameter);
        this.parameterForm.controls.tableName.disable();
        this.parameterForm.controls.type.disable();

        this.isDictSelected = this.parameter.type == ParameterType.DICT;
        this.isMultipleDictSelected = this.parameter.type == ParameterType.MULTI_DICT;
        this.isSelector = this.parameter.type == ParameterType.SELECTOR;
        this.isSubParameterChecked = this.parameter.isSubParameter;

        if (this.parameter.type == ParameterType.DICT ||
          this.parameter.type == ParameterType.MULTI_DICT ||
          this.parameter.type == ParameterType.COMBO_DICT ||
          this.parameter.type == ParameterType.SELECTOR) {
          this.adminController.getDictList().then(res => {
            this.dictForSelect = res;
          });
        }
        this.isSortBox = this.parameter.type === ParameterType.INT ||
          this.parameter.type === ParameterType.DOUBLE ||
          this.parameter.type === ParameterType.LONG ||
          this.parameter.type === ParameterType.CALC ||
          this.parameter.type === ParameterType.PERCENTAGE ||
          this.parameter.type === ParameterType.DATE_SELECTOR;

        this.adminController.getDictValueList(this.parameter.parameterRef).then(res => {
          this.dictValueForSelect = res;
        });

        if (this.parameter.filterType) {
          this.paramForFilter.setValue(this.parameter.filterType);
        }
      });
      this.adminController.getProductParameterSelectItems(this.id).then(res => {
        this.parameterSelect = res;
      });

      return;
    }

    this.adminController.getDictList().then(res => {
      this.dictForSelect = res;
    });

  }

  getTypeList() {
    let types = Object.keys(ParameterType);
    const index = types.indexOf(ParameterType.REGION_SELECTOR);
    if (index !== -1) {
      types.splice(index, 1);
    }

    return types;
  }

  onDictSelected(event: MatSelectChange) {
    if (event.value === ParameterType.DICT) {
      this.isDictSelected = true;
      this.isMultipleDictSelected = false;
      this.isComboDictSelected = false;
      this.isSelector = false;
      this.parameterForm.controls.dictTable.setValidators([Validators.required]);
      return;
    } else if (event.value === ParameterType.MULTI_DICT) {
      this.isDictSelected = false;
      this.isMultipleDictSelected = true;
      this.isComboDictSelected = false;
      this.isSelector = false;
      this.parameterForm.controls.dictTable.setValidators([Validators.required]);
      return;
    } else if (event.value === ParameterType.COMBO_DICT) {
      this.isDictSelected = false;
      this.isMultipleDictSelected = false;
      this.isComboDictSelected = true;
      this.isSelector = false;
      this.parameterForm.controls.dictTable.setValidators([Validators.required]);
      return;
    } else if (event.value === ParameterType.SELECTOR) {
      this.isDictSelected = false;
      this.isMultipleDictSelected = false;
      this.isComboDictSelected = false;
      this.isSelector = true;
      this.parameterForm.controls.dictTable.setValidators([Validators.required]);
      return;
    }

    this.isSortBox = event.value === ParameterType.INT || event.value === ParameterType.DOUBLE || event.value === ParameterType.LONG;


    this.clearDictType();
  }

  private clearDictType() {
    if (this.isDictSelected) {
      this.isDictSelected = false;
    }
    if (this.isMultipleDictSelected) {
      this.isMultipleDictSelected = false;
    }
    this.parameterForm.controls.dictTable.clearValidators();
    this.parameterForm.controls.dictTable.reset();
  }

  submit() {
    this.parameterToReturn = this.parameterForm.getRawValue();

    if (this.id != null) {
      this.parameterToReturn.id = this.id;
    }

    if (this.parameterToReturn.isSorting) {
      this.adminController.getOnCheckSort(this.parameterToReturn.tableName).then(res => {
        if (res.length !== 0) {
          this.errorSort = res;
          this.parameterForm.get('isSorting').setValue(false);
          return;
        }
        this.dialogRef.close(this.parameterToReturn);
      });
    } else {
      this.dialogRef.close(this.parameterToReturn);
    }
  }

  closeHandler() {
    this.dialogRef.close(null);
  }

  subParameterChecked(event: MatCheckboxChange) {
    if (event.checked) {
      this.adminController.getProductParameterSelectItems(this.id).then(res => {
        this.parameterSelect = res;
        this.isSubParameterChecked = true;
        this.parameterForm?.controls?.parameterRef.setValidators([Validators.required]);
        this.parameterForm?.controls?.dictCodeColumn.setValidators([Validators.required]);
      });
      return;
    }
    this.isSubParameterChecked = false;

    this.parameterForm?.controls?.parameterRef.clearValidators();
    this.parameterForm?.controls?.parameterRef.reset();

    this.parameterForm?.controls?.dictCodeColumn.clearValidators();
    this.parameterForm?.controls?.dictCodeColumn.reset();
  }

  subParameterSelected(event: MatSelectChange) {
    this.adminController.getDictValueList(event.value).then(res => {
      this.dictValueForSelect = res;
    });
  }

  changeType(event: any) {
    this.parameterForm.get('filterType').setValue(event);
  }

  changeIsFilter($event: MouseEvent) {

  }
}
