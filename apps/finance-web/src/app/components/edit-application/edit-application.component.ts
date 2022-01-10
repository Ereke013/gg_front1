import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ApplicationStatus} from '@finance-web/models/application/application-status';
import {ApplicationController} from '@finance-web/controller/ApplicationController';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.scss']
})
export class EditApplicationComponent implements OnInit {

  tabNames: string[] = ['product_data', 'borrower_data', 'pledge_data', 'additionally', 'total_cost'];
  statuses: string[] = [ApplicationStatus.SENT, ApplicationStatus.UNDER_CONSIDERATION, ApplicationStatus.DENIED, ApplicationStatus.APPROVED, ApplicationStatus.DOESNT_MEET_THE_REQUIREMENTS];
  titleName: string;
  status: string;
  id: number;

  constructor(private dialogRef: MatDialogRef<EditApplicationComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private fb: FormBuilder,
              private translateService: TranslateService,
              private applicationController: ApplicationController
  ) {
  }

  ngOnInit(): void {
    this.id = this.data;
    this.titleName = this.translateService.instant('application') + ' №' + this.id;
    this.applicationController.getStatus(this.id).then(x => this.status = x);
  }

  changeValue(event: string) {
    this.status = event;
    this.applicationController.changeStatus(this.id, this.status).then();
  }

  downloadApplicationFile() {
    this.applicationController.saveApplicationPdf(this.id).then();
  }

  close() {
    this.dialogRef.close();
  }
}
