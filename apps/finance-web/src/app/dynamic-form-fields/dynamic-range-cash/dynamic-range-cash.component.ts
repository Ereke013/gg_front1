import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-range',
  templateUrl: './dynamic-range-cash.component.html',
  styleUrls: ['./dynamic-range-cash.component.scss']
})
export class DynamicRangeCashComponent implements OnInit {

  @Input() label: string;
  @Input() formControl: AbstractControl;

  @Output() checkPeriodDate = new EventEmitter<boolean>();

  cashFrom: string;
  cashTo: string;

  constructor() {
  }

  ngOnInit(): void {
    if (this.formControl.value !== undefined && this.formControl.value !== null && this.formControl.value.trim() !== '') {
      const cash_from = this.formControl.value.split(',')[0];
      const cash_to = this.formControl.value.split(',')[1];

      if (cash_from !== undefined && cash_from !== null) {
        this.cashFrom = cash_from;
      } else {
        this.cashFrom = "0";
      }

      if (cash_to !== undefined && cash_to !== null) {
        this.cashTo = cash_to;
      } else this.cashTo = "0";
    }
  }

  onChangeCashValue() {

    if (!this.cashFrom && !this.cashTo) {
      this.formControl.setValue(null);
      return;
    }

    this.formControl.setValue((this.cashFrom ? this.cashFrom.toString() : '') + ',' + (this.cashTo ? this.cashTo.toString() : ''));
  }


}
