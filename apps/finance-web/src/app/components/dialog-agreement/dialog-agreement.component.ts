import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApplicationController} from "@finance-web/controller/ApplicationController";

@Component({
  selector: 'app-dialog-agreement',
  templateUrl: './dialog-agreement.component.html',
  styleUrls: ['./dialog-agreement.component.scss']
})
export class DialogAgreementComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DialogAgreementComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private applicationController: ApplicationController) {
  }

  agreementText: string;

  ngOnInit(): void {
    this.applicationController.getAgreementInfo().then(res => {
      this.agreementText = res;
    });
  }

  close() {
    this.dialogRef.close();
  }

}
