import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-copy-dialog-window',
  templateUrl: './copy-dialog-window.component.html',
  styleUrls: ['./copy-dialog-window.component.scss']
})
export class CopyDialogWindowComponent implements OnInit {

  copyObj: boolean = false;

  constructor(private dialogRef: MatDialogRef<CopyDialogWindowComponent>) {
  }

  ngOnInit(): void {
  }

  copy() {
    this.copyObj = true;
    this.dialogRef.close(this.copyObj);
  }
}
