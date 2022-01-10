import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Dict } from '../../../models/dict/Dict';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-dynamic-dict-select',
  templateUrl: './dynamic-dict-select.component.html',
  styleUrls: ['./dynamic-dict-select.component.scss']
})
export class DynamicDictSelectComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;
  @Input() dictList: Dict[];

  @Output() fieldClicked = new EventEmitter<boolean>();
  @Output() optionSelected = new EventEmitter<{ event: MatOptionSelectionChange, dictValueCode: string }>();
  @Output() foSelected = new EventEmitter<{ value: string, label: string }>();

  constructor() {
  }

  ngOnInit(): void {
  }

  dictFieldClicked() {
    this.fieldClicked.emit(true);
  }

  dictOptionSelected(event: MatOptionSelectionChange, dictValueCode: string) {

    if (event.isUserInput) {
      if (dictValueCode === 'nothingIsChosen') {
        this.formControl.setValue(null);
      }
      if (this.label === 'Финансовая организация') {
        this.foSelected.emit({ value: event.source.value, label: this.label });
      }
      this.optionSelected.emit({ event, dictValueCode });
    }
  }

  getOptionValue(dict: string) {
    if (dict === 'nothingIsChosen') {
      return null;
    }
    return dict;
  }
}
