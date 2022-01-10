import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-dynamic-range-period',
  templateUrl: './dynamic-range-period.component.html',
  styleUrls: ['./dynamic-range-period.component.scss']
})
export class DynamicRangePeriodComponent implements OnInit {

  @Input() label: string;
  @Input() formControl: AbstractControl;

  @Output() checkPeriodDate = new EventEmitter<boolean>();

  dateFrom: Date;
  dateTo: Date;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    if (this.formControl.value !== undefined && this.formControl.value !== null && this.formControl.value.trim() !== '') {
      const from = this.formControl.value.split(',')[0];
      const to = this.formControl.value.split(',')[1];

      this.dateFrom = (from) ? new Date(from) : null;
      this.dateTo = (to) ? new Date(to) : null;
      this.dateChange();
    }
  }

  dateChange() {
    if (!this.dateFrom && !this.dateTo) {
      this.formControl.setValue('');
    } else if (!this.dateTo) {
      this.formControl.setValue(this.datePipe.transform(this.dateFrom, 'dd.MM.yyyy') + ',' + ' ');
    } else if (!this.dateFrom) {
      this.formControl.setValue(' ' + ',' + this.datePipe.transform(this.dateTo, 'dd.MM.yyyy'));
    } else {
      this.formControl.setValue(this.datePipe.transform(this.dateFrom, 'dd.MM.yyyy') + ',' + this.datePipe.transform(this.dateTo, 'dd.MM.yyyy'));
    }
  }
}
