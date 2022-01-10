import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";
import {Dict} from "@finance-web/models/dict/Dict";
import {AdditionCredit} from "@finance-web/models/credit_history/AdditionCredit";

@Component({
  selector: 'app-dialog-credit-history',
  templateUrl: './dialog-credit-history.component.html',
  styleUrls: ['./dialog-credit-history.component.scss']
})
export class DialogCreditHistoryComponent implements OnInit {
  dictList: Dict[];

  label: string = '';
  formAmountInput: string = '';
  formDelayInput: string = '';
  creditAmountSelectorType: string = 'days';
  creditDelaySelectorType: string = 'month';

  constructor(private dialogRef: MatDialogRef<DialogCreditHistoryComponent>,
              private dialog: MatDialog,
              private creditConsumerController: CreditConsumerController,
              @Inject(MAT_DIALOG_DATA) private data) {
  }

  ngOnInit(): void {
    this.dictList = this.data.dictList;

    this.initCredit();
  }

  initCredit() {
    this.formAmountInput = this.data.creditHistory?.amountOfDays.split(',')[0];

    this.formDelayInput = this.data.creditHistory?.delayTerm.split(',')[0];
  }

  close() {
    this.dialogRef.close(null);
  }

  save() {
    if ((this.formAmountInput && this.formAmountInput.length > 0)
      && (this.formDelayInput && this.formDelayInput.length > 0)
      && (this.creditAmountSelectorType && this.creditAmountSelectorType.length > 0)
      && (this.creditDelaySelectorType && this.creditDelaySelectorType.length > 0)) {

      const credit: AdditionCredit = {
        amountOfDays: this.formAmountInput + "," + this.creditAmountSelectorType,
        delayTerm: this.formDelayInput + "," + this.creditDelaySelectorType
      };

      this.dialogRef.close(credit);
    } else {
      this.dialogRef.close(null);
    }
  }
}
