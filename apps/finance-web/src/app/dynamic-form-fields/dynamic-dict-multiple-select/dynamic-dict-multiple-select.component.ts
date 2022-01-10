import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Dict } from '../../../models/dict/Dict';

@Component({
  selector: 'app-dynamic-multi-dict-select',
  templateUrl: './dynamic-dict-multiple-select.component.html',
  styleUrls: ['./dynamic-dict-multiple-select.component.scss']
})
export class DynamicDictMultipleSelectComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControls: AbstractControl = new FormControl('');
  @Input() dictList: Dict[];

  @Output() filterType = new EventEmitter<string>();

  dicts = new FormControl('');

  constructor() {
  }

  ngOnInit(): void {
    const formControlValue = this.formControls?.value;
    if (formControlValue) {
      const arrDictValues: string[] = [];
      for (const dictSel of this.formControls.value?.split(',')) {
        arrDictValues.push(dictSel);
      }
      this.dicts.setValue(arrDictValues);
    }
  }

  selectChanged() {

    this.formControls.setValue('');

    let selectedStr = '';
    for (const sel of this.dicts.value) {
      selectedStr += sel + ',';
    }
    selectedStr = selectedStr.slice(0, -1);
    this.formControls.setValue(selectedStr);

    this.filterType.emit(this.formControls.value);
  }
}
