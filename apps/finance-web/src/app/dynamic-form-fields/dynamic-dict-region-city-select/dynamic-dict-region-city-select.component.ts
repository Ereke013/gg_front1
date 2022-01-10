import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";
import {ClientLocation} from "@finance-web/models/location/ClientLocation";
import {MatOptionSelectionChange} from "@angular/material/core";

@Component({
  selector: 'app-dynamic-regions-multi-dict-select',
  templateUrl: './dynamic-dict-region-city-select.component.html',
  styleUrls: ['./dynamic-dict-region-city-select.component.scss']
})
export class DynamicDictRegionCitySelectComponent implements OnInit {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() formControl: AbstractControl;

  @Output() filterType = new EventEmitter<string>();

  dicts = new FormControl('');

  regions: ClientLocation[];
  isAll: boolean = false;

  constructor(private creditConsumerController: CreditConsumerController) {
  }

  ngOnInit(): void {

    const formControlValue = this.formControl.value;

    this.creditConsumerController.getLocations().then(res => {
      this.regions = res;
    });

    if (formControlValue) {
      this.stringToArray();
    }
  }

  selectChanged() {

    this.formControl.setValue('');

    let selectedStr = '';
    for (const sel of this.dicts.value) {
      selectedStr += sel + ',';
    }
    selectedStr = selectedStr.slice(0, -1);
    this.formControl.setValue(selectedStr);

    this.filterType.emit(this.formControl.value);
  }

  selectionChange($event: MatOptionSelectionChange) {
    if ($event.source.selected) {
      let selectedCities = '';

      for (const region of this.regions) {
        for (const cities of region.cityName) {
          selectedCities += cities.cityCode + ',';
        }
      }
      selectedCities = selectedCities.slice(0, -1);

      this.formControl.setValue(selectedCities);

      this.stringToArray();
    }
    else {
      this.formControl.setValue('');

      this.stringToArray();
    }
  }

  stringToArray() {
    const arrDictValues: string[] = [];

    for (const dictSel of this.formControl.value.split(',')) {
      arrDictValues.push(dictSel);
    }

    this.dicts.setValue(arrDictValues);
  }
}
