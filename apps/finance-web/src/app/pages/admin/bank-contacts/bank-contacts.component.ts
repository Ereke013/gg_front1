import {Component, OnInit} from '@angular/core';
import {DynamicTable} from '@finance-web/models/dynamic_table/DynamicTable';
import {TableFilter} from '@finance-web/models/filter/TableFilter';
import {TableOrderingState} from '@finance-web/models/filter/TableOrderingState';
import {BankContactController} from '@finance-web/controller/BankContactController';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditBankContactsComponent} from '@finance-web/app/components/edit-bank-contacts/edit-bank-contacts.component';
import {BankProductToSave} from '@finance-web/models/bank_product/BankProductToSave';
import {TableOrdering} from '@finance-web/models/filter/TableOrdering';
import {DeleteDialogWindowComponent} from '@finance-web/app/components/delete-dialog-window/delete-dialog-window.component';
import {adminAccess, deleteRecordFromTable} from '@finance-web/app/shares/util-method';
import {BoService, BulkOpButtonType} from '@finance-web/services/business-objects.service';
import {UserRole} from "@finance-web/models/client/UserRole";
import {AuthenticationService} from "@finance-web/services/authentication.service";

@Component({
  selector: 'app-bank-contacts',
  templateUrl: './bank-contacts.component.html',
  styleUrls: ['./bank-contacts.component.scss']
})
export class BankContactsComponent implements OnInit {

  dictBoiTable: DynamicTable;
  filter: TableFilter;

  private pageSize = 10;

  boiDictFilter: TableFilter;
  dictPageSize = 10;

  bankContactAccessRoles: string[] = [UserRole.ADMIN];

  isAccess: boolean = false;

  constructor(private bankContactController: BankContactController,
              private dialog: MatDialog,
              private boService: BoService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.boiDictFilter = {
      paging: {limit: this.dictPageSize, offset: 0},
      search: '',
      ordering: null,
      onlyRemoved: false
    };

    this.isAccess = adminAccess(this.authenticationService.currentEmployeeValue, this.bankContactAccessRoles);

    this.getDefaultFilter();
    this.fetchTableData(false);
  }

  getDefaultFilter(): TableFilter {
    return this.filter = {
      paging: {offset: 0, limit: this.pageSize},
      search: '',
      ordering: {
        fieldId: '',
        state: TableOrderingState.UNSET
      },
      onlyRemoved: false
    };
  }

  fetchTableData(isScroll: boolean) {
    this.bankContactController.getTable(this.filter).then(res => {
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

  openEditDialog(id: string) {
    const data = id == null ? null : id;

    const dialogConfig = {
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      data: data
    } as MatDialogConfig;

    const dialogRef = this.dialog.open(EditBankContactsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data != null) {
        this.saveBankContact(data as BankProductToSave);
      }

    });

  }

  handleSearchText(event: string) {
    this.filter.search = event;
    this.resetPaging();
    this.fetchTableData(false);
  }

  setProductOrdering(ordering: TableOrdering) {
    this.filter.ordering = ordering;
    this.resetPaging();
    this.fetchTableData(false);
  }

  resetPaging() {
    this.filter.paging = {
      offset: 0,
      limit: 10
    };

    this.pageSize = 10;
  }

  deleteBankContact(ids: string[]) {
    if (ids.length == 1) {
      // if (!isNaN(+ids[0])) {

      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        data === true ? this.bankContactController.deleteBankContact(ids[0]) : console.log('not to delete');

        if (data === true) {
          deleteRecordFromTable(this.dictBoiTable, ids[0]);
        }

      });
      // }

      return;
    }

    this.deleteCheckedBankContacts(ids);
  }

  deleteCheckedBankContacts(ids: string[]) {
    if (ids.length > 0) {
      this.bankContactController.deleteCheckedInstances(ids).then(() => {
        this.fetchTableData(false);
      });
    }
  }

  onBulkOpButtonClick(type: BulkOpButtonType) {
    this.boService.bulkOpButtonClicked(type);
  }

  private saveBankContact(toSave: BankProductToSave) {
    this.bankContactController.save(toSave).then(() => {
      this.fetchTableData(false);
    });

  }

  loadNextContactInstanceRecords($event: boolean) {
    if ($event) { // after scroll down
      this.boiDictFilter.paging = {
        offset: this.dictPageSize,
        limit: 10
      };

      this.dictPageSize += 10;


      this.fetchDictTable(true);
    }
  }

  fetchDictTable(isScroll: boolean) {
    this.bankContactController.getTable(this.boiDictFilter).then(res => {
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
}
