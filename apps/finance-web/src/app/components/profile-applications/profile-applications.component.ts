import {Component, OnInit} from '@angular/core';
import {ApplicationController} from '@finance-web/controller/ApplicationController';
import {ApplicationRecordToDisplay} from '@finance-web/models/application/ApplicationRecordToDisplay';
import {OrderState} from '@finance.workspace/shared/model';
import {ApplicationCardRequest} from "@finance-web/models/product_card/ApplicationCardRequest";
import {ApplicationCardComponent} from "@finance-web/app/components/product-card/application-card.component";
import {ScreenUtil} from "@finance-web/app/shares/ScreenUtil";
import {MatDialog} from "@angular/material/dialog";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-profile-applications',
  templateUrl: './profile-applications.component.html',
  styleUrls: ['./profile-applications.component.scss']
})
export class ProfileApplicationsComponent implements OnInit {

  displayedColumns: string[] = ['position', 'nameOfOrganization', 'nameOfCredit', 'monthlyPayment', 'totalCost', 'status', 'dateAndTime'];

  dataSource: ApplicationRecordToDisplay[] = [];

  ordering = OrderState.UNSET;

  constructor(private applicationController: ApplicationController,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.applicationController.getApplicationTable().then(res => {
      this.dataSource = res;
      let i = 1;
      this.dataSource.forEach(x => {
        x.position = i;
        i += 1;
      });
    });
  }

  changeOrdering() {
    if (this.ordering === OrderState.UNSET) {
      this.ordering = OrderState.ASC;
    } else if (this.ordering === OrderState.ASC) {
      this.ordering = OrderState.DESC;
    } else if (this.ordering === OrderState.DESC) {
      this.ordering = OrderState.UNSET;
    }


  }

  private sortTable() {
    this.dataSource.sort()
  }

  showApplication(row: ApplicationRecordToDisplay) {
    this.applicationController.getClientApplicationInfo(row.id).then(res => {
      const applicationCardRequest: ApplicationCardRequest = {
        id: res.id,
        sumOfCredit: res.sumOfCredit,
        termOfCredit: res.termOfCredit,
        initialFee: res.initialFee,
        pageTab: res.pageTab
      };

      applicationCardRequest.sumOfCredit = applicationCardRequest.initialFee ? (Number(applicationCardRequest.sumOfCredit) +
        Number(Number(applicationCardRequest.sumOfCredit) * Number(applicationCardRequest.initialFee)) / (100 - Number(applicationCardRequest.initialFee))).toString() : applicationCardRequest.sumOfCredit;

      const dialogRef = this.dialog.open(ApplicationCardComponent, {
        restoreFocus: false,
        autoFocus: false,
        width: ScreenUtil.isSmall ? '100vw' : '55vw',
        height: '85vh',
        maxWidth: 'none',
        panelClass: 'product-card',
        data: {applicationCardRequest: applicationCardRequest, page: 'profile'},

      });

    });
  }
}
