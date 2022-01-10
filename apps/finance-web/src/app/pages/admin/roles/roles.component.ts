import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicTable } from '@finance-web/models/dynamic_table/DynamicTable';
import { TableFilter } from '@finance-web/models/filter/TableFilter';
import { BoService, BulkOpButtonType } from '@finance-web/services/business-objects.service';
import { CheckBoxElement } from '@finance-web/models/help/CheckBoxElement';
import { AdminController } from '@finance-web/controller/AdminController';
import { TableOrderingState } from '@finance-web/models/filter/TableOrderingState';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditRolesComponent } from '@finance-web/app/components/edit-roles/edit-roles.component';
import { SubSink } from '@finance.workspace/shared/util';
import { DeleteDialogWindowComponent } from '@finance-web/app/components/delete-dialog-window/delete-dialog-window.component';
import { deleteRecordFromTable } from '@finance-web/app/shares/util-method';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {

  boiTable: DynamicTable;
  boiFilter: TableFilter;

  private pageSize = 10;
  private subSink = new SubSink();

  constructor(public readonly boService: BoService,
              private dialog: MatDialog,
              private adminController: AdminController) {
  }

  ngOnInit(): void {
    this.getDefaultFilter();
    this.fetchTableData(false);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  fetchTableData(isScroll: boolean) {

    if (!isNaN(+this.boiFilter?.ordering?.fieldId) && +this.boiFilter?.ordering?.fieldId > 3) {
      return;
    }

    this.adminController.getManagersTable(this.boiFilter).then(res => {
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

  addNewParameterColumns(checkedElements: CheckBoxElement) {
    this.adminController.addProductColumns(checkedElements).then(res => {
      this.boiTable = res;
      console.log(this.boiTable);
      this.getDefaultFilter();
    });
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

  openEditRole(id: string) {
    if (!isNaN(+id)) {
      const data = id == null ? null : +id;

      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        width: '70vw',
        data: data
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(EditRolesComponent, dialogConfig);
      this.subSink.sink = dialogRef.afterClosed().subscribe(() => this.fetchTableData(false));
    }
  }

  deleteItem(ids: string[]) {
    if (ids.length == 1) {
      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        data === true ? this.adminController.deleteManager(ids[0]) : console.log('not to delete');

        if (data === true) {
          deleteRecordFromTable(this.boiTable, ids[0]);
        }

      });

      return;
    }

    this.deleteCheckedBankContacts(ids);
  }

  deleteCheckedBankContacts(ids: string[]) {
    if (ids.length > 0) {
      this.adminController.deleteCheckedInstances(ids, 'role').then(() => {
        this.adminController.deleteCheckedInstances(ids, 'client').then(() => {
          this.fetchTableData(false);
        });
      });
    }
  }

  handleSearch(event: string) {
    this.boiFilter.search = event;
    this.fetchTableData(false);
  }
}
