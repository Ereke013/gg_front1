import { Component, Inject, OnInit } from '@angular/core';
import { CreditConsumerController } from '@finance-web/controller/CreditConsumerController';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { numberWithSpaces } from '@finance-web/app/shares/util-method';
import { RepaymentCard } from '@finance-web/models/product_card/RepaymentCard';
import { RepaymentTable } from '@finance-web/models/product_card/RepaymentTable';
import { ApplicationCardRequest } from '@finance-web/models/product_card/ApplicationCardRequest';
import { ReportController } from '@finance-web/controller/ReportController';

@Component({
  selector: 'app-repayment-schedule',
  templateUrl: './repayment-schedule.component.html',
  styleUrls: ['./repayment-schedule.component.scss']
})
export class RepaymentScheduleComponent implements OnInit {

  sumCreditInt: number = null;
  allInterestSum: number = 0;

  monthlyPayment: string = '-';
  logo: string = '';

  repaymentCard: RepaymentCard;

  repaymentTableCard: RepaymentTable[];

  constructor(private dialogRef: MatDialogRef<RepaymentScheduleComponent>,
              @Inject(MAT_DIALOG_DATA) private data,
              private clientController: CreditConsumerController,
              private reportController: ReportController) {

  }

  ngOnInit(): void {
    this.sumCreditInt = this.data.applicationRequest?.sumOfCredit;
    if(this.data.applicationRequest?.initialFee){
      this.sumCreditInt = Number(this.sumCreditInt) + Number((this.sumCreditInt * Number(this.data.applicationRequest?.initialFee)) / (100 - Number(this.data.applicationRequest?.initialFee)));
    }
    this.repaymentCard = this.data;

    this.prepareTableData();
  }

  numDivide(value: string) {
    return numberWithSpaces(value);
  }

  prepareTableData() {
    const cardRequest: ApplicationCardRequest = {
      id: this.repaymentCard.applicationRequest.id,
      sumOfCredit: this.repaymentCard.applicationRequest.sumOfCredit,
      termOfCredit: this.repaymentCard.applicationRequest.termOfCredit,
      initialFee: this.repaymentCard.applicationRequest.initialFee,
      monthlyPayment: this.repaymentCard.applicationRequest.monthlyPayment
    };

    this.clientController.getPaymentCard(cardRequest).then(res => {
      this.repaymentTableCard = res;

      for (const cardRow of this.repaymentTableCard) {
        this.allInterestSum += cardRow.interestCharges;
      }

      this.sumCreditInt = Number(this.sumCreditInt);
    });
  }

  withSpace(number: number) {
    return numberWithSpaces(number.toString());
  }

  downloadPdf() {
    const cardRequest: ApplicationCardRequest = {
      id: this.repaymentCard.applicationRequest.id,
      sumOfCredit: this.repaymentCard.applicationRequest.sumOfCredit,
      termOfCredit: this.repaymentCard.applicationRequest.termOfCredit,
      monthlyPayment: this.repaymentCard.applicationRequest.monthlyPayment
    };
    this.reportController.exportPdf(cardRequest).then();
  }

  closeRepaymentDialog() {
    this.dialogRef.close(null);
  }

  close() {
    this.dialogRef.close();
  }
}
