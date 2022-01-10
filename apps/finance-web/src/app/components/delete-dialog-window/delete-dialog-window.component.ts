import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog-window',
  templateUrl: './delete-dialog-window.component.html',
  styleUrls: ['./delete-dialog-window.component.scss']
})
export class DeleteDialogWindowComponent implements OnInit {

  deleteObj = false;

  constructor(private dialogRef: MatDialogRef<DeleteDialogWindowComponent>) { }

  ngOnInit(): void {
  }

  delete() {
    this.deleteObj = true;
    this.dialogRef.close(this.deleteObj);
  }
}
