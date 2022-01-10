import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {ApplicationCard} from '@finance-web/models/product_card/ApplicationCard';
import {FilterToProduct} from '@finance-web/models/all-filters/FilterToProduct';
import {AllFilters} from '@finance-web/models/all-filters/AllFilters';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ApplicationCardRequest} from '@finance-web/models/product_card/ApplicationCardRequest';
import {numberWithSpaces} from '@finance-web/app/shares/util-method';
import {RepaymentScheduleComponent} from '@finance-web/app/components/repayment-schedule/repayment-schedule.component';
import {RepaymentCard} from '@finance-web/models/product_card/RepaymentCard';
import {DialogBankContactsComponent} from '@finance-web/app/components/dialog-bank-contacts/dialog-bank-contacts.component';
import {ParameterType} from '@finance-web/models/product/ParameterType';
import {ScreenUtil} from '@finance-web/app/shares/ScreenUtil';
import {ApplicationController} from '@finance-web/controller/ApplicationController';
import {DialogPkbComponent} from '@finance-web/app/components/dialog-pkb/dialog-pkb.component';
import {ProfileController} from '@finance-web/controller/ProfileController';
import {PkbController} from '@finance-web/controller/PkbController';
import {DialogPledgeClientComponent} from '@finance-web/app/components/dialog-pledge-client/dialog-pledge-client.component';
import {ApplicationSave} from '@finance-web/models/application/ApplicationSave';
import {DialogDocumentClientComponent} from '@finance-web/app/components/dialog-document-client/dialog-document-client.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthenticationService} from "@finance-web/services/authentication.service";
import {DialogAuthClientComponent} from "@finance-web/app/components/dialog-auth-client/dialog-auth-client.component";
import {DialogSuccessPkbComponent} from "@finance-web/app/components/dialog-success-pkb/dialog-success-pkb.component";
import {PledgeApplication} from "@finance-web/models/application/PledgeApplication";
import {DocumentApplication} from "@finance-web/models/application/DocumentApplication";

@Component({
  selector: 'app-application-card',
  templateUrl: './application-card.component.html',
  styleUrls: ['./application-card.component.scss']
})
export class ApplicationCardComponent implements OnInit {

  termSelectList: string[] = ['month', 'year'];

  productCard: ApplicationCard;
  documents: string[] = [];

  descrFilterProd: FilterToProduct;

  isSentBtn: boolean = true;

  filters: AllFilters[] = [];
  filter: FilterToProduct;

  isDeleteIconSumOfCredit: boolean = true;
  isDeleteIconTermOfCredit: boolean = true;
  isDeleteIconInitialFee: boolean = true;
  isSumBool: boolean = false;
  isTermBool: boolean = false;
  isInitialFeeBool: boolean = false;
  isMobile: boolean = false;
  isLoad: boolean = false;

  isProfileQuery: boolean = false;
  isBankCooperation: boolean = false;

  maxCreditSumSelection = 100_000_000;
  stepSumSelection: number = 10000;

  monthlyPayment: string = '-';
  totalCost: string = '-';
  termType: string = '';

  maxSumInput: number = Number.MAX_VALUE;
  minSumInput: number = 1;
  maxTermInput: number = Number.MAX_VALUE;
  minTermInput: number = 1;
  minInitialInput: number = 0;
  maxInitialInput: number = 100;

  request: ApplicationCardRequest = {id: 0, sumOfCredit: '', termOfCredit: ''};

  constructor(@Inject(MAT_DIALOG_DATA) private data,
              private dialogRef: MatDialogRef<ApplicationCardComponent>,
              private clientController: CreditConsumerController,
              private cdr: ChangeDetectorRef,
              private applicationController: ApplicationController,
              private profileController: ProfileController,
              private dialog: MatDialog,
              private pkbController: PkbController,
              private _snackBar: MatSnackBar,
              private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    let applicationCard = this.data.applicationCardRequest;

    this.isMobile = ScreenUtil.isSmall;
    this.request.id = applicationCard?.id;
    this.request.sumOfCredit = applicationCard?.sumOfCredit;
    this.request.initialFee = applicationCard?.initialFee;
    this.request.termOfCredit = applicationCard?.termOfCredit;
    this.request.pageTab = applicationCard?.pageTab;
    this.termType = this.data?.termType ? this.data?.termType : 'month';

    this.isProfileQuery = this.data?.page === 'profile';

    this.isDeleteIconSumOfCredit = !applicationCard?.sumOfCredit;
    this.isDeleteIconTermOfCredit = !applicationCard?.termOfCredit;
    this.isDeleteIconInitialFee = !applicationCard?.initialFee;

    if (this.request.sumOfCredit && this.request.termOfCredit) {
      this.isSentBtn = false;
    }

    applicationCard.termOfCredit = applicationCard.termOfCredit ? applicationCard.termOfCredit : '1';
    applicationCard.termOfCredit = this.termType === 'year' ? (Number(applicationCard.termOfCredit) * 12).toString() : applicationCard.termOfCredit;

    applicationCard.sumOfCredit = applicationCard.initialFee && applicationCard.initialFee > 0 ? (applicationCard.sumOfCredit - ((applicationCard.sumOfCredit * applicationCard.initialFee) / 100)) : applicationCard.sumOfCredit;
    this.clientController.getApplicationCard(this.data.applicationCardRequest).then(res => {
      this.productCard = res;
      if (this.productCard.documentList) {
        this.documents = Array.from(this.productCard.documentList.split(','));
      }

      if (this.productCard.creditSum?.length > 3) {
        if (this.productCard.creditSum.split(',')[0]) {
          this.minSumInput = Number(this.productCard.creditSum.split(',')[0]);
        }
        if (this.productCard.creditSum.split(',')[1]) {
          this.maxSumInput = Number(this.productCard.creditSum.split(',')[1]);
        }
      }

      if (this.productCard.creditTerm?.length > 1) {
        if (this.productCard.creditTerm.split(',')[0]) {
          this.minTermInput = Number(this.productCard.creditTerm.split(',')[0]);
        }
        if (this.productCard.creditTerm.split(',')[1]) {
          this.maxTermInput = Number(this.productCard.creditTerm.split(',')[1]);
        }
      }

      if (this.productCard?.initialFee?.length > 1) {
        if (this.productCard.initialFee.split(',')[0]) {
          this.minInitialInput = Number(this.productCard.initialFee.split(',')[0]);
        }
        if (this.productCard.initialFee.split(',')[1]) {
          this.maxInitialInput = Number(this.productCard.initialFee.split(',')[1]);
        }
      }

      this.monthlyPayment = this.productCard.calculationList.find(it => it.title === 'monthlyPayment').value;
      this.totalCost = this.productCard.calculationList.find(it => it.title === 'totalCost').value;
      this.productCard.calculationList = this.productCard.calculationList.filter(it => it.title !== 'monthlyPayment' && it.title !== 'totalCost');

      this.descrFilterProd = this.productCard.displayableParamsList.filter(x => x.type === ParameterType.DESCRIPTION)[0];
      this.productCard.displayableParamsList = this.productCard.displayableParamsList.filter(x => x !== this.descrFilterProd);

      this.request.monthlyPayment = this.monthlyPayment.substring(0, this.monthlyPayment.length - 1);
      this.request.initialFee = this.request.initialFee?.toString();

      this.isBankCooperation = this.productCard.isCooperation;
    });
  }

  changeSum() {
    this.cdr.detectChanges();

    this.isDeleteIconSumOfCredit = !this.request.sumOfCredit;

    if (this.request.sumOfCredit?.toString().startsWith('0')) {
      return;
    }

    const currentSum = this.request.initialFee ? (Number(this.request.sumOfCredit) - ((Number(this.request.sumOfCredit) * Number(this.request.initialFee)) / 100)) : this.request.sumOfCredit;
    if (Number(currentSum) > this.minSumInput && Number(currentSum) < this.maxSumInput) {
      this.isSumBool = false;
    } else {
      this.isSumBool = true;
      return;
    }

    this.rewriteCalculations();
  }

  changeTerm() {
    this.cdr.detectChanges();
    this.isDeleteIconTermOfCredit = !this.request.termOfCredit;
    if (this.request.termOfCredit?.toString().startsWith('0') || Number(this.request.termOfCredit) < 0) {
      this.request.termOfCredit = '1';
      return;
    }

    if (Number(this.request.termOfCredit) >= this.minTermInput && Number(this.request.termOfCredit) <= this.maxTermInput) {
      this.isTermBool = false;
    } else {
      this.isTermBool = true;
      return;
    }

    this.rewriteCalculations();

  }

  onClearSumOfCredit() {
    this.request.sumOfCredit = null;
    this.isDeleteIconSumOfCredit = true;
    this.changeSum();
  }

  onClearTermOfCredit() {
    this.request.termOfCredit = null;
    this.isDeleteIconTermOfCredit = true;
    this.changeTerm();
  }

  onClearInitialFee() {
    this.request.initialFee = null;
    this.isDeleteIconInitialFee = true;
    this.changeFee();
  }

  btnSentDisable() {
    return !(this.request.sumOfCredit && this.request.termOfCredit && this.sumBetween());
  }

  sumBetween() {
    const currentTerm = this.termType === 'year' ? (Number(this.request.termOfCredit) * 12) : this.request.termOfCredit;
    const currentInitialFee = this.request.initialFee;
    const currentSum = this.request.initialFee ? (Number(this.request.sumOfCredit) - ((Number(this.request.sumOfCredit) * Number(this.request.initialFee)) / 100)) : this.request.sumOfCredit;

    if (!(this.minSumInput <= Number(currentSum)) || !(this.maxSumInput >= Number(currentSum))) {
      this.isSumBool = true;
      return false;
    }
    if (!(this.minTermInput <= currentTerm) || !(this.maxTermInput >= currentTerm)) {
      this.isTermBool = true;
      return false;
    }

    this.isTermBool = false;
    this.isSumBool = false;

    if ((this.request.pageTab === 'mortgage' || this.request.pageTab === 'carCredit')) {
      if (!(this.minInitialInput <= Number(currentInitialFee)) || !(this.maxInitialInput >= Number(currentInitialFee))) {
        this.isInitialFeeBool = true;
        return false;
      }
      if (!(Number(this.request.initialFee) > 0)) {
        return false;
      }
    }

    this.isInitialFeeBool = false;
    return true;
  }

  rewriteCalculations() {
    if (this.isCreditInfoFilled()) {
      const application: ApplicationCardRequest = {
        id: this.data.applicationCardRequest.id,
        sumOfCredit: this.request.initialFee ? (Number(this.request.sumOfCredit) - (Number(this.request.sumOfCredit) * (Number(this.request.initialFee) / 100))).toString() : this.request.sumOfCredit.toString(),
        termOfCredit: this.request.termOfCredit?.toString(),
        initialFee: this.request.initialFee?.toString(),
        pageTab: this.request?.pageTab
      };
      if (this.termType === 'year') {
        application.termOfCredit = (Number(this.request.termOfCredit) * 12).toString();
      }

      this.clientController.getApplicationCard(application).then(res => {
        this.monthlyPayment = numberWithSpaces(res.calculationList.find(it => it.title === 'monthlyPayment').value);
        this.totalCost = numberWithSpaces(res.calculationList.find(it => it.title === 'totalCost').value);
        this.productCard.calculationList = res.calculationList.filter(it => it.title !== 'monthlyPayment' && it.title !== 'totalCost');

        this.productCard.displayableParamsList = res.displayableParamsList;
        this.descrFilterProd = this.productCard.displayableParamsList.filter(x => x.type === ParameterType.DESCRIPTION)[0];
        this.productCard.displayableParamsList = this.productCard.displayableParamsList.filter(x => x !== this.descrFilterProd);
      });
    }
  }

  isCreditInfoFilled() {
    if (Number(this.request.sumOfCredit) > 0 && Number(this.request.termOfCredit) > 0 && this.sumBetween()) {
      if ((this.request.pageTab === 'mortgage' || this.request.pageTab === 'сarCredit') && !this.request.initialFee) {
        return false;
      }
      return true;
    }
    return false;
  }

  numDivide(value: string) {
    return numberWithSpaces(value);
  }

  openRepaymentSchedule(logo: string | undefined, title: string | undefined) {
    if (this.isCreditInfoFilled()) {
      const applicationCardRequest: ApplicationCardRequest = {
        id: this.data.applicationCardRequest.id,
        sumOfCredit: Number(this.request.initialFee) > 0 ? (Number(this.request.sumOfCredit) - ((Number(this.request.sumOfCredit) * Number(this.request.initialFee)) / 100)).toString() : Number(this.request.sumOfCredit).toString(),
        termOfCredit: this.termType === 'year' ? (Number(this.request.termOfCredit) * 12).toString() : Number(this.request.termOfCredit).toString(),
        monthlyPayment: this.monthlyPayment,
        initialFee: this.request.initialFee
      };

      const repaymentCard: RepaymentCard = {
        applicationRequest: applicationCardRequest,
        logo: logo,
        title: title
      };

      const dialogRef = this.dialog.open(RepaymentScheduleComponent, {
        restoreFocus: false,
        autoFocus: false,
        height: '85vh',
        maxWidth: 'none',
        panelClass: 'repayment-schedule',
        data: repaymentCard
      });

      dialogRef.afterClosed().subscribe(data => {
        if (data == null) {
          return;
        }
      });
    }
  }

  showBankContact() {
    const bankData = {
      id: this.data.applicationCardRequest.id,
      logo: this.productCard.logo,
      title: this.productCard.title
    };

    const dialogRef = this.dialog.open(DialogBankContactsComponent, {
      restoreFocus: false,
      autoFocus: false,
      width: this.isMobile ? '80vw' : '50vw',
      panelClass: 'bank-contacts-dialog',
      data: bankData,
      minHeight: '20vh',
      maxHeight: '80vh'
    });
  }

  close() {
    this.dialogRef.close();
  }

  changeFee() {
    this.cdr.detectChanges();
    this.isDeleteIconInitialFee = !this.request.initialFee;
    if (Number(this.request.initialFee) > 100) {
      this.request.initialFee = '100';
    }

    if (Number(this.request.initialFee) >= this.minInitialInput && Number(this.request.initialFee) < this.maxInitialInput) {
      this.isInitialFeeBool = false;
    } else {
      this.isInitialFeeBool = true;
      return;
    }

    this.rewriteCalculations();

  }

  saveApplication() {
    if (this.isMobile) {
      this._snackBar.open('Заявку можно сделать только с компьютера!', 'Закрыть', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 8000,
        panelClass: 'error-snake-bar'
      });
    } else if (!this.authService.currentEmployeeValue) {
      const authDialog = this.dialog.open(DialogAuthClientComponent, {
        panelClass: 'auth-dialog',
        width: this.isMobile ? '100vw' : '45vw',
        maxWidth: this.isMobile ? '' : '80vw',
        height: this.isMobile ? '100%' : '',
        restoreFocus: false,
      });

      authDialog.afterClosed().subscribe(res => {
        if (res === 'success') {
          this.openDialog();
        }
      });
    } else {
      this.openDialog();
    }

  }

  openDialog() {
    this.isLoad = true;
    this.applicationController.isExists(this.data.applicationCardRequest.id).then(res => {
      this.isLoad = false;
      if (res.code === '200') {
        this.existsPkbInUser();
      } else if (res.code === '400') {
        this.notExistsPkbInUser();
      }
    });


  }

  existsPkbInUser() {
    const dialogRef = this.dialog.open(DialogSuccessPkbComponent, {
      panelClass: 'pkb-dialog',
      width: '55vw',
      height: '40vh',
      restoreFocus: false,
      data: 'success_identification'
    });

    dialogRef.afterClosed().subscribe(() => {
        this.request.id = this.data.applicationCardRequest.id;
        this.applicationController.saveApplication(this.request).then(res => {
          if (res?.toString() === '-1') {
            this._snackBar.open('Заявка с таким продуктом уже существует!', 'Закрыть', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 8000,
              panelClass: 'error-snake-bar'
            });
          } else {
            this.request.id = Number(res);
            this.applicationController.checkAccessible(this.request.id).then(res=>{
              if(res.code === '200'){
                this.openPledgeDialog(null, null);
              }else if(res.code === '400'){
                this._snackBar.open(res.message, 'Закрыть', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  duration: 8000,
                  panelClass: 'error-snake-bar'
                });
              }
            });
          }
        });
      }
    );
  }

  notExistsPkbInUser() {
    const dialogRef = this.dialog.open(DialogPkbComponent, {
      panelClass: 'pkb-dialog',
      width: '55vw',
      maxHeight: '55vh',
      restoreFocus: false,
      data: {
        request: this.request,
        productId: this.data.applicationCardRequest.id
      }
    });

    dialogRef.afterClosed().subscribe(iin => {
      if (iin && iin !== '-1' && this.data.applicationCardRequest.id) {
        this.isLoad = true;
        this.pkbController.requestPkbByIin(iin, this.data.applicationCardRequest.id).then(it => {
          this.isLoad = false;
          if (it.code === '400') {
            this._snackBar.open(it.message, 'Закрыть', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 8000,
              panelClass: 'error-snake-bar'
            });
            // this.pkbController.cancelApplication(this.data.applicationCardRequest.id).then();
          } else {
            this.openPledgeDialog(null, null);
          }
        }, error => {
          this._snackBar.open('Серверная ошибка, попробуйте позже!', 'Закрыть', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 8000,
            panelClass: 'error-snake-bar'
          });
          this.isLoad = false;
          this.pkbController.cancelApplication(this.data.applicationCardRequest.id).then();
          this.dialogRef.close();
        });
      } else if (iin === '-1') {
        this._snackBar.open('Заявка с таким продуктом уже существует!', 'Закрыть', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 8000,
          panelClass: 'error-snake-bar'
        });
        this.isLoad = false;
      }
    });
  }

  openPledgeDialog(selectedPledges: PledgeApplication[], selectedDocList: DocumentApplication[]) {
    const dialogRef = this.dialog.open(DialogPledgeClientComponent, {
      panelClass: 'pledge-dialog',
      width: '55vw',
      minHeight: '30vh',
      maxHeight: '70vh',
      restoreFocus: false,
      data: {
        productId: this.data.applicationCardRequest.id,
        requestData: this.request,
        selectedPledges: selectedPledges
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res?.code === 'skip') {
        this.openDocumentDialog(res.list, selectedDocList);
      } else if (res?.code === '') {
        const applicationSave: ApplicationSave = {
          documentApplicationList: [],
          pledgeColumnList: res.list
        };
        this.profileController.saveApplicationPledge(applicationSave).then(() => {
          this.openDocumentDialog(applicationSave.pledgeColumnList, selectedDocList);
        });
      }
      // else {
      //   this.pkbController.cancelApplication(this.data.applicationCardRequest.id).then();
      // }
    });
  }

  openDocumentDialog(pledgeColumnList: PledgeApplication[], selectedDocList: DocumentApplication[]) {
    const data = {
      applicationId: this.request.id,
      selectedList: selectedDocList
    };

    const dialogRef = this.dialog.open(DialogDocumentClientComponent, {
      panelClass: 'document-dialog',
      width: '55vw',
      minHeight: '30vh',
      maxHeight: '70vh',
      restoreFocus: false,
      data: data
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res.code === 'sending') {
        const applicationSave: ApplicationSave = {
          documentApplicationList: res.listDoc,
          pledgeColumnList: []
        };
        this.profileController.saveApplicationDoc(applicationSave).then(() => {

          this._snackBar.open('Заявка отправлена!', 'Закрыть', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            duration: 8000,
            panelClass: 'success-snake-bar'
          });
          this.dialogRef.close();

          this.request.id = this.data.applicationCardRequest.id;
          this.applicationController.updateApplicationToSend(this.request).then(res => {
            this._snackBar.open('Заявка отправлена!', 'Закрыть', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 8000,
              panelClass: 'success-snake-bar'
            });
            this.dialogRef.close();
          });
        });


      } else if (res.code === 'back') {
        this.openPledgeDialog(pledgeColumnList, res.listDoc);
      }
      // else {
      //   this.pkbController.cancelApplication(this.data.applicationCardRequest.id).then();
      // }
    });
  }

  sliderChange(value: number) {
    if (value < 1) {
      return;
    }
    this.request.sumOfCredit = value.toString();
  }
}
