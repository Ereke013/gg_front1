import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {CheckBoxRecord} from "@finance-web/models/help/CheckBoxRecord";
import {FilterByParameter} from "@finance-web/models/filter/FilterByParameter";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input()
  public set setInputElements(inputElements: CheckBoxRecord[]) {
    if (!inputElements) {
      return;
    }
    this.elementFormArray.clear();
    this.filters = [];

    this.inputElements = inputElements;
    this.addCheckboxes();
  }

  inputElements: CheckBoxRecord[];
  inputElementsCopy: CheckBoxRecord[];

  @Input() isFilterColumn: boolean;

  @Output() searchText = new EventEmitter<string>();
  @Output() searchFilter = new EventEmitter<FilterByParameter[]>();

  checkedBoxes = 0;

  search: string;
  searchInputFilter: string;

  filterType: CheckBoxRecord;
  filterTypeSec = new FormControl('');

  filterGroup: FormGroup;
  filterGroupCopy: FormGroup;

  isPopOverClosed = false;
  isMore: boolean = false;
  isSubmitted: boolean = false;

  filters: FilterByParameter[] = [];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.filterGroup = this.fb.group({
      elements: new FormArray([])
    });

    this.filterGroupCopy = this.filterGroup;
  }

  find() {
    this.searchText.emit(this.search);
  }

  get elementFormArray() {
    return this.filterGroup.controls.elements as FormArray;
  }

  get elementFormArrayCopy() {
    return this.filterGroup.controls.elements as FormArray;
  }

  findAdditionalFilter() {
    if (this.filters) {
      this.searchFilter.emit(this.filters);
    }
  }

  setPopOverStatus() {
    this.isPopOverClosed = false;
  }

  changeModel(idx, event) {
  }

  submit() {
    const selectedElementsIds = this.filterGroup.value.elements
      .map((checked, i) => checked ? this.inputElements[i].id : null)
      .filter(v => v !== null);

    for (let i = 0; i < this.filters.length; i++) {
      const check = selectedElementsIds.some(r => r === this.filters[i].filterModel.id);
      if (!check) {
        this.filters.splice(i, 1);
        i--;
      }
    }

    for (const selectedId of selectedElementsIds) {

      const checkedRecord = this.inputElements.find(input => input.id == selectedId);

      const filter: FilterByParameter = {
        filterModel: {
          id: checkedRecord.id,
          title: checkedRecord.title,
          isChecked: true,
          tableName: checkedRecord.tableName,
          parameterType: checkedRecord.parameterType
        },
        search: ''
      };
      const found = this.filters.some(r => filter.filterModel.title === r.filterModel.title);
      if (!found) {
        this.filters.push(filter);
      }
    }
    this.isPopOverClosed = true;
    this.filterGroupCopy = this.filterGroup;
  }

  countCheckedBoxes(event: MatCheckboxChange) {
    if (event.checked) {
      this.checkedBoxes++;
    } else {
      this.checkedBoxes--;
    }
    this.isMore = this.checkedBoxes >= 8;
  }

  private addCheckboxes() {
    if (this.inputElements) {
      for (const inp of this.inputElements) {
        this.elementFormArray.push(new FormControl(!inp.isChecked));
      }
      this.inputElementsCopy = this.inputElements;
    }
  }
}
