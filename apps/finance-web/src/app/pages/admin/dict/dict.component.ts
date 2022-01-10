import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ApiService} from '@finance-web/services/api.service';
import {BoService, BulkOpButtonType} from '@finance-web/services/business-objects.service';
import {AdminController} from '@finance-web/controller/AdminController';
import {DynamicTable} from '@finance-web/models/dynamic_table/DynamicTable';
import {TableFilter} from '@finance-web/models/filter/TableFilter';
import {DeleteDialogWindowComponent} from '@finance-web/app/components/delete-dialog-window/delete-dialog-window.component';
import {addRecordToTable, deleteRecordFromTable} from '@finance-web/app/shares/util-method';
import {EditDictComponent} from '@finance-web/app/components/edit-dict/edit-dict.component';
import {TableOrdering} from '@finance-web/models/filter/TableOrdering';
import {DictToSave} from '@finance-web/models/dict/DictToSave';
import {DynamicTableFieldValue} from '@finance-web/models/dynamic_table/DynamicTableFieldValue';
import {DICT_TABLE, DICT_VALUE_TABLE} from '@finance-web/app/shares/common-const';
import {DictToSaveValue} from '@finance-web/models/dict/DictToSaveValue';
import {TableOrderingState} from '@finance-web/models/filter/TableOrderingState';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Dict} from "@finance-web/models/dict/Dict";

@Component({
  selector: 'app-dict',
  templateUrl: './dict.component.html',
  styleUrls: ['./dict.component.scss']
})
export class DictComponent implements OnInit {

  dictBoiTable: DynamicTable;
  dictValueBoiTable: DynamicTable;

  dictValueForm: FormGroup;
  dictForSelect: Dict[];

  boiDictFilter: TableFilter;
  boiDictValueFilter: TableFilter;

  dictValue: DictToSaveValue;

  isDictValueTableShown: boolean;
  isDragging: boolean;
  isClickedRowChanged: boolean = false;

  dictPageSize = 10;
  dictValuePageSize = 10;

  currentDict: string = '';
  selectedId: string = '';

  constructor(private dialog: MatDialog,
              private apiService: ApiService,
              private boService: BoService,
              private fb: FormBuilder,
              private adminController: AdminController) {

  }

  ngOnInit(): void {


    this.isDictValueTableShown = false;
    this.isDragging = false;

    this.boiDictFilter = {
      paging: {limit: this.dictPageSize, offset: 0},
      search: '',
      ordering: null,
      onlyRemoved: false
    };

    this.boiDictValueFilter = {
      paging: {limit: this.dictValuePageSize, offset: 0},
      search: '',
      ordering: null,
      onlyRemoved: false
    };

    this.fetchDictTable(false);
  }

  fetchDictTable(isScroll: boolean) {
    this.adminController.getDictTable(this.boiDictFilter).then(res => {
      if (isScroll) {
        for (const r of res.records) {
          this.dictBoiTable.records.push(r);
        }
        this.dictBoiTable.hasNext = res.hasNext;
        return;
      }

      this.dictBoiTable = res;
    });
  }

  fetchDictValueTable(isScroll: boolean) {
    this.adminController.getDictValueTable(this.boiDictValueFilter, this.currentDict).then(res => {
      if (isScroll) {
        for (const r of res.records) {
          this.dictValueBoiTable.records.push(r);
        }
        this.dictValueBoiTable.hasNext = res.hasNext;
        return;
      }

      this.dictValueBoiTable = res;
    });
  }

  handleDictSearchText(event: string) {
    this.boiDictFilter.search = event;
    this.resetDictPaging();
    this.fetchDictTable(false);
  }

  handleDictValueSearchText(event: string) {
    this.boiDictValueFilter.search = event;
    this.resetDictValuePaging();
    this.fetchDictValueTable(false);
  }

  openDictEditDialog(id: string) {
    const dialogConfig = {
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      data: id
    } as MatDialogConfig;

    const dialogRef = this.dialog.open(EditDictComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      if (data == null) {
        return;
      }

      this.saveDict(data as DictToSave);
    });

  }

  openDictValueTables(id: string) {
    if (id != null) {
      this.isDictValueTableShown = true;
      this.currentDict = id;
      this.resetDictValuePaging();

      this.boiDictValueFilter.ordering = {
        fieldId: '',
        state: TableOrderingState.UNSET
      };

      this.fetchDictValueTable(false);
      return;
    }

    this.openDictEditDialog(null); // for button 'Добавить'
  }

  openDictValueEditDialog(id: string) {
    this.isDragging = false;

    if (!isNaN(+id) && id != null) {
      this.selectedId = id;
    } else {
      this.selectedId = this.currentDict;
    }
    this.isDragging = true;
  }

  onDictValueBulkOpButtonClick(type: BulkOpButtonType) {
    this.boService.bulkOpButtonClicked(type);
  }

  onDictBulkOpButtonClick(type: BulkOpButtonType) {
    this.boService.bulkOpButtonClicked(type);
  }

  deleteDict(ids: string[]) {
    if (ids.length === 1) {
      this.deleteValue(this.dictBoiTable, ids[0], DICT_TABLE);
      return;
    }

    this.deleteCheckedDict(ids);
  }

  private deleteCheckedDict(ids: string[]) {
    if (ids.length > 0) {
      this.adminController.deleteCheckedInstances(ids, DICT_TABLE).then(res => {
        if (res === ids.length) {
          for (const id of ids) {
            deleteRecordFromTable(this.dictBoiTable, id);
          }
        }
      });
    }
  }

  deleteDictValue(ids: string[]) {
    if (ids.length === 1) {
      this.deleteValue(this.dictValueBoiTable, ids[0], DICT_VALUE_TABLE);
    }

    this.deleteCheckedDictValues(ids);
  }

  private deleteCheckedDictValues(ids: string[]) {
    if (ids.length > 0) {
      this.adminController.deleteCheckedInstances(ids, DICT_VALUE_TABLE).then(res => {
        if (res === ids.length) {
          for (const id of ids) {
            deleteRecordFromTable(this.dictBoiTable, id);
          }
        }
      });
    }
  }

  deleteValue(table: DynamicTable, id: string, tableName: string) {
    const dialogConfig = {
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true
    } as MatDialogConfig;

    const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {

      switch (tableName) {
        case DICT_TABLE:
          data === true ? this.adminController.deleteDict(id) : console.log('not to delete');
          break;
        case DICT_VALUE_TABLE:
          data === true && !isNaN(+id) ? this.adminController.deleteDictValue(+id) : console.log('not to delete');
          break;
      }

      if (data === true) {
        deleteRecordFromTable(table, id);
      }

      if (tableName === DICT_TABLE) {
        this.isDictValueTableShown = false;
      }

    });
  }

  loadNextDictInstanceRecords(event: boolean) {
    if (event) { // after scroll down
      this.boiDictFilter.paging = {
        offset: this.dictPageSize,
        limit: 10
      };

      this.dictPageSize += 10;

      this.fetchDictTable(true);
    }
  }

  loadNextDictValueInstanceRecords(event: boolean) {
    if (event) { // after scroll down
      this.boiDictValueFilter.paging = {
        offset: this.dictValuePageSize,
        limit: 10
      };

      this.dictValuePageSize = this.dictValuePageSize + 10;

      this.fetchDictValueTable(true);
    }
  }

  setDictOrdering(ordering: TableOrdering) {
    this.boiDictFilter.ordering = ordering;
    this.resetDictPaging();
    this.fetchDictTable(false);
  }

  setDictValueOrdering(ordering: TableOrdering) {
    this.boiDictValueFilter.ordering = ordering;
    this.resetDictValuePaging();
    this.fetchDictValueTable(false);
  }

  resetDictPaging() {
    this.boiDictFilter.paging = {
      offset: 0,
      limit: 10
    };

    this.dictPageSize = 10;
  }

  resetDictValuePaging() {
    this.boiDictValueFilter.paging = {
      offset: 0,
      limit: 10
    };

    this.dictValuePageSize = 10;
  }

  private saveDict(modalResData: DictToSave) {

    let toEdit = false;
    if (this.dictBoiTable.records.find(d => d.instanceId === modalResData.dict) != null) {
      toEdit = true;
    }

    this.adminController.saveDict(modalResData).then(res => {

      const fieldVal: DynamicTableFieldValue[] = [
        {fieldId: 1, value: res.dict, displayValue: res.dict},
        {fieldId: 2, value: res.displayTitleEn, displayValue: res.displayTitleEn},
        {fieldId: 3, value: res.displayTitleRu, displayValue: res.displayTitleRu},
        {fieldId: 4, value: res.displayTitleKk, displayValue: res.displayTitleKk}
      ];

      addRecordToTable(this.dictBoiTable, res.dict, fieldVal, toEdit);
    });
  }

  private saveDictValue(modalResData: DictToSaveValue) {

    let toEdit = false;
    if (modalResData.id != null) {
      toEdit = true;
    }

    this.adminController.saveDictValue(modalResData).then(res => {

      const fieldVal: DynamicTableFieldValue[] = [
        {fieldId: 1, value: res.dictCodeColumn, displayValue: res.dictCodeColumn},
        {fieldId: 2, value: res.dictTitleColumnRu, displayValue: res.dictTitleColumnRu},
        {fieldId: 3, value: res.dictTitleColumnEn, displayValue: res.dictTitleColumnEn},
        {fieldId: 4, value: res.dictTitleColumnKk, displayValue: res.dictTitleColumnKk}
      ];

      addRecordToTable(this.dictValueBoiTable, res.id.toString(), fieldVal, toEdit);

    });

  }

  closeHandler() {
    this.isDragging = false;
  }

  submit() {

  }

  saveData(event: DictToSaveValue) {
    this.saveDictValue(event);
    this.isDragging = false;
  }

  closeDialog(event: boolean) {
    this.isDragging = false;
  }
}
