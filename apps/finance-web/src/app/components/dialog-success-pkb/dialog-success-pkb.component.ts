import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success-pkb',
  templateUrl: './dialog-success-pkb.component.html',
  styleUrls: ['./dialog-success-pkb.component.scss']
})
export class DialogSuccessPkbComponent implements OnInit {
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<DialogSuccessPkbComponent>
  ) {
  }

  ngOnInit(): void {
    this.message = this.data;
    this.dialogRef.updatePosition(({ top: '7vh' }));
  }

  close() {
    this.dialogRef.close();
  }

  route() {
    this.close();

    if (this.data != 'success_identification') {
      return;
    }


    // this.router.navigate(['/profile'], {
    //     queryParams: { path: 'applications' }
    //   }
    // ).then(() => this.close());
  }
}
