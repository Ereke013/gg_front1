import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dynamic-range',
  templateUrl: './dynamic-commission.component.html',
  styleUrls: ['./dynamic-commission.component.scss']
})
export class DynamicCommissionComponent implements OnInit {

  @Input() label: string;
  @Input() formControl: AbstractControl;

  @Output() checkPeriodDate = new EventEmitter<boolean>();

  commissionValue: string;
  commissionType: string;

  typesForCommissions: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.commissionType = 'TENGE';

    if (this.formControl.value) {
      const comVal = this.formControl.value.split(',')[0];

      const comType = this.formControl.value.split(',')[1];

      if (comVal && comVal.trim() !== '') {
        this.commissionValue = comVal;
      }
      if (comType && comType.trim() !== '') {
        this.commissionType = comType;
      }
    }
    this.typesForCommissions.push('PERCENTAGE');
    this.typesForCommissions.push('TENGE');
  }

  onChangeCommissionValue() {
    if (this.commissionValue && this.commissionType) {
      this.formControl.setValue(this.commissionValue + ',' + this.commissionType);
    } else {
      this.formControl.setValue(null);
    }
  }


}
