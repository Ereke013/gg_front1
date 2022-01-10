import { Component, OnInit } from '@angular/core';
import { DynamicTable } from '@finance-web/models/dynamic_table/DynamicTable';
import { TableFilter } from '@finance-web/models/filter/TableFilter';
import { ApplicationController } from '@finance-web/controller/ApplicationController';
import { TableOrderingState } from '@finance-web/models/filter/TableOrderingState';
import { TableOrdering } from '@finance-web/models/filter/TableOrdering';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditApplicationComponent } from '@finance-web/app/components/edit-application/edit-application.component';
import {UserRole} from "@finance-web/models/client/UserRole";
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {adminAccess} from "@finance-web/app/shares/util-method";

@Component({
  selector: 'app-bank-contacts',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  table: DynamicTable;
  filter: TableFilter;
  applicationAccessRoles: string[] = [UserRole.ADMIN, UserRole.FO_MANAGER];
  isAccess: boolean = false;

  private pageSize = 10;

  constructor(private applicationController: ApplicationController,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.isAccess = adminAccess(this.authenticationService.currentEmployeeValue, this.applicationAccessRoles);

    this.getDefaultFilter();
    this.fetchTableData(false);
  }

  getDefaultFilter(): TableFilter {
    return this.filter = {
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
    this.applicationController.getApplications(this.filter).then(res => {
      if (isScroll) {
        for (const r of res.records) {
          this.table.records.push(r);
        }
        this.table.hasNext = res.hasNext;
        return;
      }
      this.table = res;
    });
  }

  handleSearchText(event: string) {
    this.filter.search = event;
    this.resetPaging();
    console.log(this.filter);
    this.fetchTableData(false);
  }

  resetPaging() {
    this.filter.paging = {
      offset: 0,
      limit: 10
    };

    this.pageSize = 10;
  }

  setProductOrdering(ordering: TableOrdering) {
    this.filter.ordering = ordering;
    console.log(ordering);
    this.resetPaging();
    console.log(this.filter);
    this.fetchTableData(false);
  }

  openEditDialog(id: string) {
    if (!isNaN(+id)) {
      const data = id == null ? null : +id;

      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true,
        data: data,
        panelClass: 'edit-application-dialog'
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(EditApplicationComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {

        if (data != null) {

          // this.saveBankContact(data as BankProductToSave);

        }

      });
    }

  }

  loadNextBoInstanceRecords(event: boolean) {
    if (event) { // after scroll down
      this.filter.paging = {
        offset: this.pageSize,
        limit: 10
      };

      this.pageSize = this.pageSize + 10;
      this.fetchTableData(true);
    }
  }
}
