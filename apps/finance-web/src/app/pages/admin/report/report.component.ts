import {Component, OnInit} from '@angular/core';
import {ReportController} from "@finance-web/controller/ReportController";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-bank-contacts',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  dateFrom: string;
  dateTo: string;

  isDownloadFile: boolean = false;

  constructor(private reportController: ReportController,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  dateChange() {
    this.isDownloadFile = !!(this.dateFrom && this.dateTo);
  }

  downloadReport() {
    this.reportController.exportExcel(this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd')
      + "," + this.datePipe.transform(this.dateTo, 'yyyy-MM-dd'))
      .then();
  }
}
