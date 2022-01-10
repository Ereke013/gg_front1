import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckBoxRecord } from '@finance-web/models/help/CheckBoxRecord';
import { BulkOpButtonType } from '@finance-web/services/business-objects.service';
import { CheckBoxElement } from '@finance-web/models/help/CheckBoxElement';
import { DynamicTable } from '@finance-web/models/dynamic_table/DynamicTable';
import { TableFilter } from '@finance-web/models/filter/TableFilter';
import { TableOrdering } from '@finance-web/models/filter/TableOrdering';
import { FilterByParameter } from '@finance-web/models/filter/FilterByParameter';

@Component({
  selector: 'app-admin-item-page',
  templateUrl: './admin-item-page.component.html',
  styleUrls: ['./admin-item-page.component.scss']
})
export class AdminItemPageComponent implements OnInit {

  @Input() boiTable: DynamicTable;
  @Input() boiFilter: TableFilter;
  @Input() isPopOverNeeded: boolean = false;
  @Input() pageItemName: string;
  @Input() popOverCheckBoxElements: CheckBoxRecord[];
  @Input() isSettingsButtonNeeded: boolean = false;
  @Input() isCopyButtonNeeded: boolean = false;
  @Input() popoverFilter: CheckBoxRecord[];
  @Input() isFilterColumn: boolean = false;
  @Input() isAccess: boolean = true;
  @Input() isCustomButtonNeeded: boolean = true;

  @Output() bulkUpButtonClicked = new EventEmitter<BulkOpButtonType>();
  @Output() editItemId = new EventEmitter<string>();
  @Output() checkedElements = new EventEmitter<CheckBoxElement>();
  @Output() searchTextResult = new EventEmitter<string>();
  @Output() deleteItemId = new EventEmitter<string[]>();
  @Output() settingsItemId = new EventEmitter<string>();
  @Output() loadMoreItems = new EventEmitter<boolean>();
  @Output() tableOrdering = new EventEmitter<TableOrdering>();
  @Output() copyItem = new EventEmitter<string>();
  @Output() filterParam = new EventEmitter<FilterByParameter[]>();

  isPopOverClosed = false;
  isBulkUpButton = false;

  filterByParameter: FilterByParameter[];

  searchText: string;

  constructor() {
  }

  ngOnInit(): void {
    this.isBulkUpButton = false;
  }

  openEditDialog(id: string) {
    if (!this.isAccess) {
      return;
    }
    this.editItemId.emit(id);
  }

  onBulkOpButtonClick(type: BulkOpButtonType) {
    this.bulkUpButtonClicked.emit(type);
  }

  setClosePopOverStatus() {
    this.isPopOverClosed = false;
  }

  closePopOver(event: boolean) {
    this.isPopOverClosed = event;
  }

  addNewParameterColumns(checked: CheckBoxElement) {
    this.checkedElements.emit(checked);
  }

  handleSearchText(text: string) {
    this.searchText = text;
    this.searchTextResult.emit(this.searchText);
    if (this.filterByParameter) {
      this.filterParam.emit(this.filterByParameter);
    }
  }

  deleteProduct(ids: string[]) {
    this.deleteItemId.emit(ids);
  }

  loadNextBoInstanceRecords() {
    this.loadMoreItems.emit(this?.boiTable?.hasNext);
  }

  setProductParamSettings(id: string) {
    this.settingsItemId.emit(id);
  }

  setBulkUpButtonStatus(toShow: boolean) {
    this.isBulkUpButton = toShow;
  }

  getOrderingFromTable(event: TableOrdering) {
    this.tableOrdering.emit(event);
    this.boiFilter.ordering = event;
  }

  copyProduct(id: string) {
    this.copyItem.emit(id);
  }

  searchFilterChange(event: FilterByParameter[]) {
    this.filterByParameter = event;
    this.filterParam.emit(this.filterByParameter);
    this.searchTextResult.emit(this.searchText);
  }
}
