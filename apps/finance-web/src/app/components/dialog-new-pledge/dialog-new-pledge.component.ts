import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreditConsumerController} from "@finance-web/controller/CreditConsumerController";
import {AllFilters} from "@finance-web/models/all-filters/AllFilters";
import {PledgeData, PledgeDataType} from "@finance-web/models/pledge/PledgeData";
import {ProfileController} from "@finance-web/controller/ProfileController";
import {PledgeValue} from "@finance-web/models/pledge/PledgeValue";
import {PledgeListToSave} from "@finance-web/models/pledge/PledgeListToSave";

@Component({
  selector: 'app-dialog-new-pledge',
  templateUrl: './dialog-new-pledge.component.html',
  styleUrls: ['./dialog-new-pledge.component.scss']
})
export class DialogNewPledgeComponent implements OnInit {
  pledgeName: string;
  pledgeType: string;

  collateral: AllFilters;

  pledge: PledgeData;

  pledges: PledgeData[] = [];

  filters: AllFilters[];

  pledgeList: PledgeListToSave;

  constructor(private dialogRef: MatDialogRef<DialogNewPledgeComponent>,
              private dialog: MatDialog,
              private creditConsumerController: CreditConsumerController,
              @Inject(MAT_DIALOG_DATA) private data,
              private profileController: ProfileController) {
  }

  ngOnInit(): void {
    if (this.pledges.length === 0) {
      this.profileController.getCollateral().then(res => {
        this.collateral = res;
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  changeName(event: any) {
    this.pledgeName = event;
  }

  async onChangeSelect(type: string) {
    switch (type) {
      case 'auto':
        this.pledgeType = 'auto';
        await this.profileController.getPledgeType(PledgeDataType.AUTO).then(res => this.filters = res);
        break;
      case 'realEstate':
        this.pledgeType = 'realEstate';
        await this.profileController.getPledgeType(PledgeDataType.PROPERTY).then(res => {
          this.filters = res;
        });
        break;
    }

  }

  changeValue(table: string, name: string, index: number) {
    const value: PledgeValue = { table: table, name: name };
    if (!this.pledgeList) {
      this.pledgeList = { id: 0, pledgeValues: [], title: '', pledgeType: '' };
      this.pledgeList.pledgeValues.push(value);
      this.pledgeList.title = this.pledgeName;
      this.pledgeList.pledgeType = this.pledgeType;
    }

    for (let i = 0; i < this.pledgeList?.pledgeValues.length; i++) {
      if (this.pledgeList.pledgeValues[i].table === value.table) {
        this.pledgeList.pledgeValues[i] = value;
        return;
      }
    }
    this.pledgeList?.pledgeValues.push(value);
    this.pledgeList.title = this.pledgeName;
    this.pledgeList.pledgeType = this.pledgeType;
  }

  savePledge() {
    if (!this.pledgeList) {
      return;
    }
    const pledges:PledgeListToSave[] = [this.pledgeList];
    this.profileController.savePledges(pledges).then(res => {
      this.pledgeList = null;
      this.dialogRef.close('200');
    });
  }
}
