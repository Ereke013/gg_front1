import { ProductParameterToSave } from '@finance-web/models/product/ProductParameterToSave';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProductParametersComponent } from '@finance-web/app/components/edit-product-parameters/edit-product-parameters.component';
import { ApiService } from '@finance-web/services/api.service';
import { DeleteDialogWindowComponent } from '@finance-web/app/components/delete-dialog-window/delete-dialog-window.component';
import { DynamicTable } from '@finance-web/models/dynamic_table/DynamicTable';
import { BoService, BulkOpButtonType } from '@finance-web/services/business-objects.service';
import { AdminController } from '@finance-web/controller/AdminController';
import { DynamicTableFieldValue } from '@finance-web/models/dynamic_table/DynamicTableFieldValue';
import { addRecordToTable, deleteRecordFromTable } from '@finance-web/app/shares/util-method';
import { TableFilter } from '@finance-web/models/filter/TableFilter';
import { TableOrdering } from '@finance-web/models/filter/TableOrdering';
import { PRODUCT_PARAMETER_TABLE } from '@finance-web/app/shares/common-const';

@Component({
  selector: 'app-product-parameters',
  templateUrl: './product-parameters.component.html',
  styleUrls: ['./product-parameters.component.scss']
})

export class ProductParametersComponent implements OnInit {

  boiTable: DynamicTable;
  boiFilter: TableFilter;

  private pageSize = 10;

  constructor(private dialog: MatDialog,
              private apiService: ApiService,
              public readonly boService: BoService,
              private adminController: AdminController) {
  }

  ngOnInit() {
    this.boiFilter = {
      paging: { limit: this.pageSize, offset: 0 },
      search: '',
      ordering: null,
      onlyRemoved: false
    } as TableFilter;

    this.fetchTableData(false);
  }

  fetchTableData(isScroll: boolean) {
    this.adminController.getProductParameterTable(this.boiFilter).then(res => {

      if (isScroll) {
        for (const r of res.records) {
          this.boiTable.records.push(r);
        }
        this.boiTable.hasNext = res.hasNext;
        return;
      }
      this.boiTable = res;
    });
  }

  openEditDialog(id: string) {

    if (!isNaN(+id)) {

      const data = id == null ? null : +id;

      let dialogConfig;

      dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        data: data
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(EditProductParametersComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {

        if (data == null) {
          return;
        }

        this.saveProductParameter(data as ProductParameterToSave);
      });
    }
  }

  deleteParameter(ids: string[]) {

    if (ids.length == 1) {

      if (!isNaN(+ids[0])) {

        const dialogConfig = {
          disableClose: false,
          autoFocus: true,
          hasBackdrop: true
        } as MatDialogConfig;

        const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(data => {
          data === true ? this.adminController.deleteProductParameter(+ids[0]) : console.log('not to delete');

          if (data === true) {
            deleteRecordFromTable(this.boiTable, ids[0]);
          }

        });
      }
      return;
    }

    this.deleteCheckedParameters(ids);
  }

  deleteCheckedParameters(ids: string[]) {
    if (ids.length > 0) {
      this.adminController.deleteCheckedInstances(ids, PRODUCT_PARAMETER_TABLE).then(res => {
        if (res === ids.length) {
          for (const id of ids) {
            deleteRecordFromTable(this.boiTable, id);
          }
        }
      });
    }
  }

  private saveProductParameter(modalResData: ProductParameterToSave) {

    let toEdit = false;
    if (modalResData.id != null) {
      toEdit = true;
    }

    this.adminController.saveProductParameter(modalResData).then(r => {
      const fieldVal: DynamicTableFieldValue[] = [
        { fieldId: 1, value: r.displayTitleEn, displayValue: r.displayTitleEn },
        { fieldId: 2, value: r.displayTitleRu, displayValue: r.displayTitleRu },
        { fieldId: 3, value: r.displayTitleKk, displayValue: r.displayTitleKk },
        { fieldId: 4, value: r.tableName, displayValue: r.tableName },
        { fieldId: 5, value: r.type, displayValue: r.type }
      ];

      addRecordToTable(this.boiTable, r.id.toString(), fieldVal, toEdit);

    });
  }

  handleSearchText(event: string) {
    this.boiFilter.search = event;
    this.resetPaging();
    this.fetchTableData(false);
  }

  loadNextBoInstanceRecords(event: boolean) {
    if (event) { // after scroll down
      this.boiFilter.paging = {
        offset: this.pageSize,
        limit: 10
      };

      this.pageSize = this.pageSize + 10;
      this.fetchTableData(true);
    }
  }

  onBulkOpButtonClick(type: BulkOpButtonType) {
    this.boService.bulkOpButtonClicked(type);
  }

  setParameterOrdering(ordering: TableOrdering) {
    this.boiFilter.ordering = ordering;
    this.resetPaging();
    this.fetchTableData(false);
  }

  resetPaging() {
    this.boiFilter.paging = {
      offset: 0,
      limit: 10
    };

    this.pageSize = 10;
  }
}
