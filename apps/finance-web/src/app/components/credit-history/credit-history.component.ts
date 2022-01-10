import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PkbController } from '@finance-web/controller/PkbController';
import { CreditHistory } from '@finance-web/models/CreditHistory';
import { ReportController } from '@finance-web/controller/ReportController';
import { DialogPkbComponent } from '@finance-web/app/components/dialog-pkb/dialog-pkb.component';

@Component({
  selector: 'app-credit-history',
  templateUrl: './credit-history.component.html',
  styleUrls: ['./credit-history.component.scss']
})
export class CreditHistoryComponent implements OnInit {

  list: CreditHistory[];

  displayedColumns: string[] = ['position', 'requestDate', 'responseDate', 'fileName'];

  constructor(private dialog: MatDialog,
              private reportController: ReportController,
              private pkbController: PkbController
  ) {
  }

  ngOnInit(): void {
    this.pkbController.getCreditHistory()
    .then(res => this.list = res)
    .catch(err => console.error('ngOnInit , ', err));
  }



  openDialog() {
    const dialogRef = this.dialog.open(DialogPkbComponent, {
      panelClass: 'pkb-dialog',
      width: '60vw',
      restoreFocus: false
    });
  }

  downloadCredit(id: number) {
    this.reportController.downloadPkbReportPdf(id).then();
  }
}
