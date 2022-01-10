import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BankContactController } from '@finance-web/controller/BankContactController';
import { BankProductToShow } from '@finance-web/models/bank_product/BankProductToShow';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";

@Component({
  selector: 'app-dialog-bank-contacts',
  templateUrl: './dialog-bank-contacts.component.html',
  styleUrls: ['./dialog-bank-contacts.component.scss']
})
export class DialogBankContactsComponent implements OnInit {

  bankContacts: BankProductToShow;
  bankContactData: any;

  constructor(private dialogRef: MatDialogRef<DialogBankContactsComponent>,
              private dialog: MatDialog,
              private creditConsumerController: CreditConsumerController,
              @Inject(MAT_DIALOG_DATA) private bankData) {
  }

  ngOnInit(): void {
    this.bankContactData = this.bankData;
    this.dialogRef.updatePosition(({ top: '7vh'}));
    this.creditConsumerController.getBankContact(this.bankData.id).then(it => {
      this.bankContacts = it;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
