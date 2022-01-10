import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Dict} from '../../../models/dict/Dict';
import {ParameterType} from "@finance-web/models/product/ParameterType";

@Component({
  selector: 'app-dynamic-date-selector',
  templateUrl: './dynamic-date-selector.component.html',
  styleUrls: ['./dynamic-date-selector.component.scss']
})
export class DynamicDateSelectorComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;
  @Input() dictList: Dict[];
  @Input() prefixDictList: Dict[];
  @Input() parameterType: ParameterType;


  dateSelectorType: string;
  dateSelectorSuffix: string;
  formInput: string;

  constructor() {
  }

  ngOnInit(): void {
    if (this.formControl.value) {
      this.dateSelectorSuffix = this.formControl.value?.split(',')[0];
      this.formInput = this.formControl.value?.split(',')[1];
      this.dateSelectorType = this.formControl.value?.split(',')[2];
    }
  }

  changeSelectorValue() {
    this.formInput = !this.formInput? '0': this.formInput;
    if (this.dateSelectorType && this.dateSelectorSuffix && this.formInput) {
      this.formControl.setValue(this.dateSelectorSuffix + ',' + this.formInput + ',' + this.dateSelectorType);
    }
  }
}
