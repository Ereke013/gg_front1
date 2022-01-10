import { Component, Input, OnInit } from '@angular/core';
import { Pledge, PledgeType } from '@finance-web/models/pledge/Pledge';
import { ApplicationController } from '@finance-web/controller/ApplicationController';
import { ApplicationRecord } from '@finance-web/models/application/ApplicationRecord';
import { UserData } from '@finance-web/models/profile/UserData';
import { AdditionalInfoTab } from '@finance-web/models/application/additional-info-tab';
import { ReportController } from '@finance-web/controller/ReportController';
import {HttpService} from "@finance.workspace/http-service";

@Component({
  selector: 'app-pledge-data-tab',
  templateUrl: './pledge-data-tab.component.html',
  styleUrls: ['./pledge-data-tab.component.scss']
})
export class PledgeDataTabComponent implements OnInit {

  @Input() id: number;
  @Input() tab: string;

  pledgeRecords: Pledge[];
  applicationRecord: ApplicationRecord;
  additionalInfo: AdditionalInfoTab;
  clientRecord: UserData;
  typeOfPledge: string;

  constructor(public applicationController: ApplicationController,
              public reportController: ReportController,
              private http: HttpService
  ) {
  }

  ngOnInit(): void {
    switch (this.tab) {
      case 'product_data':
      case 'total_cost':
        this.applicationController.getApplicationInfo(this.id).then(x => this.applicationRecord = x);
        break;
      case 'borrower_data':
        this.applicationController.getClientInfo(this.id).then(x => {
          this.clientRecord = x;
        });
        break;
      case 'additionally':
        this.applicationController.getCreditHistoryInfo(this.id).then(x => {
          this.additionalInfo = x;
        });
        break;
      case 'pledge_data':
        this.applicationController.getPledgeInfo(this.id).then(x => {
          this.pledgeRecords = x;
        });
        break;
    }
  }

  get pledgeType(): typeof PledgeType {
    return PledgeType;
  }

  downloadReport(id: number) {
    this.reportController.downloadPkbReportPdf(id).then();
  }

  downloadDoc(fileId: string) {
    const httpS: HttpService = this.http.setControllerPrefix("file");
    return  httpS.downloadResource("/download-photo" + '?fileId=' + fileId).then();
  }
}
