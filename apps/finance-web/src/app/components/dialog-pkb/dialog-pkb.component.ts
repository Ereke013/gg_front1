import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NcaLayerService} from '@finance.workspace/nca-layer-service';
import {WsController} from '@finance.workspace/ws-service';
import {SubSink} from '@finance.workspace/shared/util';
import {filter, pluck, switchMap, tap} from 'rxjs/operators';
import {DialogSuccessPkbComponent} from '@finance-web/app/components/dialog-success-pkb/dialog-success-pkb.component';
import {ReportController} from '@finance-web/controller/ReportController';
import {PkbController} from '@finance-web/controller/PkbController';
import {EdsInfo} from '@finance.workspace/shared/model';
import {ProfileController} from '@finance-web/controller/ProfileController';
import {ApplicationController} from '@finance-web/controller/ApplicationController';
import {DialogAgreementComponent} from "@finance-web/app/components/dialog-agreement/dialog-agreement.component";
import {ScreenUtil} from "@finance-web/app/shares/ScreenUtil";

@Component({
  selector: 'app-dialog-pkb',
  templateUrl: './dialog-pkb.component.html',
  styleUrls: ['./dialog-pkb.component.scss']
})
export class DialogPkbComponent implements OnInit, OnDestroy {

  private wsController: WsController;
  private subSink = new SubSink();

  iin: string = '';
  fileBase64: string;
  toSendBase64: string;
  errorMessage: string;

  edsInfo: EdsInfo;

  agreement: boolean = false;

  ngOnInit(): void {
    this.dialogRef.updatePosition(({top: '7vh'}));
    this.connectNcaLayer();
    this.pkbController.getBase64().then(it => {
      this.fileBase64 = it;
    }, error => {

    });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private readonly ncaLayerService: NcaLayerService,
              private dialogRef: MatDialogRef<DialogPkbComponent>,
              private dialog: MatDialog,
              private reportController: ReportController,
              private pkbController: PkbController,
              private profileController: ProfileController,
              private applicationController: ApplicationController
  ) {
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }


  signClick() {
    if (this.iin.length < 12) {
      this.errorMessage = 'incorrect_iin';
      return;
    }

    if (!this.fileBase64) {
      this.errorMessage = 'something_wrong';
      return;
    }

    this.wsController.send('', {
      module: 'kz.gov.pki.knca.commonUtils',
      method: 'createCMSSignatureFromBase64',
      args: [
        'PKCS12', 'SIGNATURE',
        this.fileBase64,
        true
      ]
    });

    this.subSink.sink = this.wsController.on<any>('').pipe(
      filter(x => !!x),
      tap(edsId => {
        this.toSendBase64 = edsId;
      }),
      switchMap(() => this.pkbController.checkId(this.toSendBase64).then(x => {
        this.edsInfo = x;
        if (x.iin === this.iin) {
          this.pkbController.saveBase64(this.toSendBase64).then(res => {
            this.openDialogOfIdentificationStatus(x.iin === this.iin);
          });
        }
      }))
    ).subscribe();

  }

  private connectNcaLayer() {
    this.ncaLayerService.connect();
    this.wsController = this.ncaLayerService.cd();

    this.subSink.sink = this.ncaLayerService.onConnectionError$.subscribe(() => {
      this.errorMessage = 'check_nca';
    });

    this.subSink.sink = this.ncaLayerService.response$.pipe(
      pluck('message'),
      filter(msg => msg === 'storage.empty')
    ).subscribe(() => {
      this.errorMessage = 'Ошибка. Хранилище пустое.';
      console.log('q7djMPFuF4 :: storage.empty');
    });

    this.subSink.sink = this.wsController.on<any>('').pipe(
      filter(x => !!x)
    ).subscribe();
  }

  clear() {
    this.iin = '';
  }

  downloadTermOfUse() {

    const dialogRef = this.dialog.open(DialogAgreementComponent, {
      restoreFocus: false,
      autoFocus: false,
      width: ScreenUtil.isSmall ? '100vw' : '55vw',
      height: '85vh',
      maxWidth: 'none',
      panelClass: 'agreement-dialog',
    });

    // this.reportController.exportTermOfUse().then();
  }

  private openDialogOfIdentificationStatus(isSuccess: boolean) {

    let data: string;

    if (!isSuccess) {
      data = 'failed_identification';
    } else {
      data = 'success_identification';
    }

    const dialogRef = this.dialog.open(DialogSuccessPkbComponent, {
      panelClass: 'pkb-dialog',
      width: '55vw',
      height: '40vh',
      restoreFocus: false,
      data: data
    });

    this.subSink.sink = dialogRef.afterClosed().subscribe(() => {
        this.data.request.id = this.data.productId;
        this.applicationController.saveApplication(this.data.request).then(res => {
          if (res && Number(res) > 0) {
            this.data.request.id = +res;
            this.dialogRef.close(this.iin);
          } else if (res.toString() === '-1') {
            this.dialogRef.close('-1');
          }
        });
      }
    )
    ;
  }

  checkedAgreement() {
    this.agreement = !this.agreement;
  }
}
