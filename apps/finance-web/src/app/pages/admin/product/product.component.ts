import {Component, OnInit} from '@angular/core';
import {BoService, BulkOpButtonType} from '@finance-web/services/business-objects.service';
import {DynamicTable} from '@finance-web/models/dynamic_table/DynamicTable';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditProductComponent} from '@finance-web/app/components/edit-product/edit-product.component';
import {Product} from '@finance-web/models/product/Product';
import {DeleteDialogWindowComponent} from '@finance-web/app/components/delete-dialog-window/delete-dialog-window.component';
import {CheckBoxElement} from '@finance-web/models/help/CheckBoxElement';
import {ProductParameterSettingsComponent} from '@finance-web/app/components/product-parameter-settings/product-parameter-settings.component';
import {AdminController} from '@finance-web/controller/AdminController';
import {addRecordToTable, adminAccess, deleteRecordFromTable} from '@finance-web/app/shares/util-method';
import {ProductParameterSettingToSave} from '@finance-web/models/product/ProductParameterSettingToSave';
import {ParameterSettingRecord} from '@finance-web/models/product/ParameterSettingRecord';
import {CheckBoxRecord} from '@finance-web/models/help/CheckBoxRecord';
import {TableFilter} from '@finance-web/models/filter/TableFilter';
import {TableOrdering} from '@finance-web/models/filter/TableOrdering';
import {DynamicTableFieldValue} from '@finance-web/models/dynamic_table/DynamicTableFieldValue';
import {TableOrderingState} from '@finance-web/models/filter/TableOrderingState';
import {PRODUCT_TABLE} from '@finance-web/app/shares/common-const';
import {CopyDialogWindowComponent} from '@finance-web/app/components/copy-dialog-window/copy-dialog-window.component';
import {FilterByParameter} from "@finance-web/models/filter/FilterByParameter";
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {UserRole} from "@finance-web/models/client/UserRole";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isAccess: boolean = false;
  productAccessRoles: string[] = [UserRole.ADMIN, UserRole.PRODUCT_MANAGER, UserRole.FO_MANAGER];

  boiTable: DynamicTable;
  boiFilter: TableFilter;

  parameterCheckBoxes: CheckBoxRecord[];

  filterParameterList: CheckBoxRecord[];

  additionalFilterSearch: FilterByParameter[] = [];

  private pageSize = 10;

  constructor(private dialog: MatDialog,
              public readonly boService: BoService,
              private adminController: AdminController,
              private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.adminController.getShowAsHeaderCheckBoxes().then(value => {
      this.parameterCheckBoxes = value.records;

      this.filterParameterList = this.parameterCheckBoxes.filter(x => x.isChecked === true);
    });
    this.getDefaultFilter();
    this.boiFilterAddition();

    this.isAccess = adminAccess(this.authenticationService.currentEmployeeValue, this.productAccessRoles);
  }

  getDefaultFilter(): TableFilter {
    return this.boiFilter = {
      paging: { offset: 0, limit: this.pageSize },
      search: '',
      ordering: {
        fieldId: '',
        state: TableOrderingState.UNSET
      },
      onlyRemoved: false
    };
  }

  fetchTableData(isScroll: boolean) {

    this.adminController.getProductTable(this.boiFilter).then(res => {
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

  onBulkOpButtonClick(type: BulkOpButtonType) {
    this.boService.bulkOpButtonClicked(type);
  }

  handleSearchText(event: string) {
    this.boiFilter.search = event;
    this.resetPaging();
    this.boiFilterAddition();
  }

  deleteProduct(ids: string[]) {

    if (ids.length == 1) {

      if (!isNaN(+ids[0])) {

        const dialogConfig = {
          disableClose: false,
          autoFocus: true,
          hasBackdrop: true
        } as MatDialogConfig;

        const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(data => {
          data === true ? this.adminController.deleteProduct(+ids[0]) : console.log('not to delete');

          if (data === true) {
            deleteRecordFromTable(this.boiTable, ids[0]);
          }

        });
      }
      return;
    }

    this.deleteCheckedProducts(ids);
  }

  deleteCheckedProducts(ids: string[]) {
    if (ids.length > 0) {
      this.adminController.deleteCheckedInstances(ids, PRODUCT_TABLE).then(res => {
        if (res === ids.length) {
          for (const id of ids) {
            deleteRecordFromTable(this.boiTable, id);
          }
        }
      });
    }
  }

  openEditDialog(id: string) {
    if (!isNaN(+id)) {

      const data = id == null ? null : +id;

      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        data: data
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(EditProductComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {

        if (data == null) {
          return;
        }
        this.saveProduct(data);
      });
    }
  }

  private saveProduct(modalResData: Product) {
    let toEdit = false;
    if (modalResData.id != null) {
      toEdit = true;
    }

    this.adminController.saveProduct(modalResData).then(r => {

      const fieldVal: DynamicTableFieldValue[] = [
        { fieldId: 1, value: r.displayTitleEn, displayValue: r.displayTitleEn },
        { fieldId: 2, value: r.displayTitleRu, displayValue: r.displayTitleRu },
        { fieldId: 3, value: r.displayTitleKk, displayValue: r.displayTitleKk }
      ];

      const otherFieldId = 4;

      for (let i = 3; i < this.boiTable?.records[0]?.values.length; i++) {
        fieldVal.push(
          {
            fieldId: otherFieldId,
            value: modalResData?.parameters[i - 3]?.paramValue,
            displayValue: modalResData?.parameters[i - 3]?.paramValue
          }
        );
      }

      addRecordToTable(this.boiTable, r.id.toString(), fieldVal, toEdit);

    });
  }

  loadNextBoInstanceRecords(event: boolean) {
    if (event) { // after scroll down
      this.boiFilter.paging = {
        offset: this.pageSize,
        limit: 5
      };

      this.pageSize += 5;
      this.fetchTableData(true);
    }
  }

  setProductParamSettings(id: string) {
    if (!isNaN(+id)) {

      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        data: +id
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(ProductParameterSettingsComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        if (data == null) {
          return;
        }

        this.saveProductParameterSettings(data);
      });

    }
  }

  saveProductParameterSettings(data: Product) {

    const settingsToSave = {} as ProductParameterSettingToSave;
    const parameterSettingList: ParameterSettingRecord[] = [];

    for (const prm of data.parameters) {
      parameterSettingList.push(
        {
          productId: data.id,
          parameterId: prm.parameterId,
          isDisplayable: prm.isDisplayable,
          isDisplayableInApplicationCard: prm.isDisplayableInApplicationCard,
          isVisibleToFO: prm.isVisibleToFo
        }
      );
    }

    settingsToSave.parameterSettingList = parameterSettingList;

    this.adminController.saveProductParameterSettings(settingsToSave).then(res => {
      console.log(res);
    });
  }

  addNewParameterColumns(checkedElements: CheckBoxElement) {
    this.adminController.addProductColumns(checkedElements).then(res => {
      this.boiTable = res;
      this.filterParameterList = checkedElements.records.filter(x => x.isChecked === true);
      this.getDefaultFilter();
    });
  }

  setProductOrdering(ordering: TableOrdering) {
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

  copyProduct(id: string) {
    if (id) {
      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        data: 'copy'
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(CopyDialogWindowComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        data === true ? this.adminController.copyProduct(parseInt(id)) : console.log('not to copied');

        if (data === true) {
          this.boiFilter.paging = {
            offset: 0,
            limit: this.pageSize
          };
          this.fetchTableData(false);
        }

      });
    }
  }

  searchByFilterParam(event: FilterByParameter[]) {
    this.additionalFilterSearch = event;
    this.boiFilterAddition();
  }

  boiFilterAddition() {
    if(this.additionalFilterSearch){
      this.boiFilter.additionalSearch = this.additionalFilterSearch;
    }
    this.fetchTableData(false);
  }
}
