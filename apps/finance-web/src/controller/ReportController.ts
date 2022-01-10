import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import {ApplicationCardRequest} from "@finance-web/models/product_card/ApplicationCardRequest";

@Injectable({ providedIn: 'root' })
export class ReportController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('admin-report');
  }

  exportExcel(period: string) {
    return this.http.downloadResource('/xlsx', { reportPeriod: period });
  }

  downloadPkbReportPdf(reportId: number) {
    return this.http.downloadResource('/download-pkb-pdf', {reportId});
  }

  exportTermOfUse() {
    return this.http.downloadResource('/term-of-use');
  }

  exportPdf(cardRequest: ApplicationCardRequest) {
    return this.http.downloadResource('/pdf', { id:cardRequest.id, termOfCredit: cardRequest.termOfCredit, sumOfCredit: cardRequest.sumOfCredit, monthlyPayment: cardRequest.monthlyPayment});
  }
}
