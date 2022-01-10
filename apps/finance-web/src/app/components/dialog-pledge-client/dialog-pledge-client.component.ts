import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";
import {FilterToProduct} from "@finance-web/models/all-filters/FilterToProduct";
import {Pledge} from "@finance-web/models/pledge/Pledge";
import {PledgeDataType} from "@finance-web/models/pledge/PledgeData";
import {DialogNewPledgeComponent} from "@finance-web/app/components/dialog-new-pledge/dialog-new-pledge.component";
import {ProfileController} from "@finance-web/controller/ProfileController";
import {PledgeApplication} from "@finance-web/models/application/PledgeApplication";
import {ApplicationCardRequest} from "@finance-web/models/product_card/ApplicationCardRequest";

@Component({
  selector: 'app-dialog-pledge-client',
  templateUrl: './dialog-pledge-client.component.html',
  styleUrls: ['./dialog-pledge-client.component.scss']
})
export class DialogPledgeClientComponent implements OnInit {
  pledgeShowList: Pledge[] = [];
  pledges: FilterToProduct[] = [];
  pledgeList: Pledge[] = [];
  isPledgeMenu: boolean = false;

  pledgeApplication: PledgeApplication[] = [];


  @ViewChild('pledgeId') pledgeId: ElementRef;
  @ViewChild('addPledgeButton') addPledgeButton: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.pledgeId && event.target !== this.addPledgeButton.nativeElement) {
      if (!this.pledgeId.nativeElement.contains(event.target)) {
        this.isPledgeMenu = false;
      }
    }
  }

  constructor(private dialogRef: MatDialogRef<DialogPledgeClientComponent>,
              private dialog: MatDialog,
              private creditConsumerController: CreditConsumerController,
              @Inject(MAT_DIALOG_DATA) private data,
              private profileController: ProfileController) {
  }

  ngOnInit(): void {
    const application: ApplicationCardRequest = {
      id: this.data.productId,
      sumOfCredit: this.data.requestData.initialFee ? (Number(this.data.requestData.sumOfCredit) - (Number(this.data.requestData.sumOfCredit) * (Number(this.data.requestData.initialFee) / 100))).toString() : this.data.requestData.sumOfCredit.toString(),
      termOfCredit: this.data.requestData.termOfCredit?.toString(),
      initialFee: this.data.requestData.initialFee?.toString(),
      pageTab: this.data.requestData?.pageTab
    };

    this.creditConsumerController.getApplicationCard(application).then(res => {
      this.pledgeList = res.pledgeList;

      this.initPledges();

      if (this.data.selectedPledges && this.data.selectedPledges.length > 0) {
        for (const pl of this.data.selectedPledges) {
          const idx = this.pledgeList.findIndex(x=>x.id === pl.pledgeId);
          if(idx != -1) {
            this.notSelectedPledgeList(idx);
          }
        }
      }
    });


  }

  initPledges() {
    this.pledgeList?.forEach(it => {
      if (it.typeOfPledge === PledgeDataType.PROPERTY) {
        this.pledges.push({title: 'location', value: it.location, index: it.id});
        this.pledges.push({title: 'age_of_pledger', value: it.ageOfPledger, index: it.id});
        this.pledges.push({title: 'wall_material', value: it.wallMaterial, index: it.id});
        this.pledges.push({title: 'type_of_built', value: it.typeOfBuilt, index: it.id});
        this.pledges.push({title: 'year_of_built', value: it.yearOfBuilt, index: it.id});
      } else if (it.typeOfPledge === PledgeDataType.AUTO) {
        this.pledges.push({title: 'age_of_pledger', value: it.ageOfPledger, index: it.id});
        this.pledges.push({title: 'country_of_manufacture', value: it.countryOfManufacture, index: it.id});
        this.pledges.push({title: 'year_of_release', value: it.yearOfRelease, index: it.id});
        this.pledges.push({title: 'type_of_vehicle', value: it.typeOfVehicle, index: it.id});
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  notSelectedPledgeList(i: number) {
    const pledge: Pledge = this.pledgeList[i];
    if (pledge) {
      this.pledgeShowList.push(pledge);
      this.pledgeList.splice(i, 1);
    }
  }

  addPledge() {
    this.isPledgeMenu = true;
  }

  removeSelectedPledge(i: number) {
    const pledge: Pledge = this.pledgeShowList[i];
    if (pledge) {
      this.pledgeList.push(pledge);
      this.pledgeShowList.splice(i, 1);
    }
  }

  addNewPledge() {
    const dialogRef = this.dialog.open(DialogNewPledgeComponent, {
      width: '55vw',
      panelClass: 'new-pledge-dialog'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res && res === '200') {
        this.profileController.getLastSavedPledge().then(x => {
          if (x) {
            this.pledgeShowList.push(x);
            this.initPledges();
          }
        });
      }
    });
  }

  save() {
    if (this.pledgeShowList && this.pledgeShowList.length > 0) {
      for (const pled of this.pledgeShowList) {
        const pledgeAppl: PledgeApplication = {
          applicationId: this.data.requestData.id,
          clientId: 0,
          id: 0,
          pledgeId: Number(pled.id)
        };
        this.pledgeApplication.push(pledgeAppl);
      }
      this.dialogRef.close({
        code: '',
        list: this.pledgeApplication
      });
    } else {
      this.dialogRef.close(null);
    }
  }

  skip() {
    for (const pled of this.pledgeShowList) {
      const pledgeAppl: PledgeApplication = {
        applicationId: this.data.id,
        clientId: 0,
        id: 0,
        pledgeId: Number(pled.id)
      };
      this.pledgeApplication.push(pledgeAppl);
    }

    this.dialogRef.close({
      code: 'skip',
      list: this.pledgeApplication
    });
  }
}
