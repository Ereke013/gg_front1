import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicTable } from '../../../../models/dynamic_table/DynamicTable';
import { TableFilter } from '../../../../models/filter/TableFilter';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditNewsComponent } from '../../../components/edit-news/edit-news.component';
import { TableOrderingState } from '../../../../models/filter/TableOrderingState';
import { AdminController } from '../../../../controller/AdminController';
import { DatePipe } from '@angular/common';
import { SubSink } from '../../../../../../../libs/shared/util/src';
import { DeleteDialogWindowComponent } from '../../../components/delete-dialog-window/delete-dialog-window.component';
import { deleteRecordFromTable } from '../../../shares/util-method';
import { BoService, BulkOpButtonType } from '../../../../services/business-objects.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  boiTable: DynamicTable;
  boiFilter: TableFilter;

  private pageSize = 10;
  private subSink = new SubSink();

  constructor(private dialog: MatDialog,
              private datePipe: DatePipe,
              private adminController: AdminController,
              public readonly boService: BoService) {
  }

  ngOnInit(): void {
    this.getDefaultFilter();
    this.fetchTableData(false);
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  openEditDialog(id: string) {
    const dialogConfig = {
      disableClose: false,
      autoFocus: true,
      hasBackdrop: true,
      maxHeight: '80vh',
      data: id
    } as MatDialogConfig;

    const dialogRef = this.dialog.open(EditNewsComponent, dialogConfig);
    this.subSink.sink = dialogRef.afterClosed().subscribe(() => this.fetchTableData(false));

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
    this.adminController.getNewsTable(this.boiFilter).then(res => {
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

  deleteItemId(ids: string[]) {
    if (ids.length == 1) {
      const dialogConfig = {
        disableClose: false,
        autoFocus: true,
        hasBackdrop: true
      } as MatDialogConfig;

      const dialogRef = this.dialog.open(DeleteDialogWindowComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(data => {
        data === true ? this.adminController.deleteNews(ids[0]) : console.log('not to delete');

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
      this.adminController.deleteCheckedInstances(ids, 'news').then(() => {
        this.fetchTableData(false);
      });
    }
  }

  onBulkOpButtonClick(type: BulkOpButtonType) {
    this.boService.bulkOpButtonClicked(type);
  }

  handleSearchText(event: string) {
    console.log('OK45s819zF:::', event)
    this.boiFilter.search = event;
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
