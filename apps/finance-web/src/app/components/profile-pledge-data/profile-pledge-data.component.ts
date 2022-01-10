import { Component, OnInit } from '@angular/core';
import { ProfileController } from '@finance-web/controller/ProfileController';
import { AllFilters } from '@finance-web/models/all-filters/AllFilters';
import { PledgeData, PledgeDataType } from '@finance-web/models/pledge/PledgeData';
import { PledgeValue } from '@finance-web/models/pledge/PledgeValue';
import { PledgeListToSave } from '@finance-web/models/pledge/PledgeListToSave';
import { Pledge } from '@finance-web/models/pledge/Pledge';

@Component({
  selector: 'app-profile-pledge-data',
  templateUrl: './profile-pledge-data.component.html',
  styleUrls: ['./profile-pledge-data.component.scss']
})
export class ProfilePledgeDataComponent implements OnInit {

  collateral: AllFilters;
  filters: AllFilters[];
  collaterals: AllFilters[];

  pledges: PledgeData[] = [];
  pledgeList: PledgeListToSave[] = [];

  numberOfAddedPledges: number = 0;

  constructor(private profileController: ProfileController) {
  }

  async ngOnInit() {
    await this.loadPledges();

    if (this.pledges.length === 0) {
      this.profileController.getCollateral().then(res => {
        this.collateral = res;
      });
    }
  }

  async onChangeSelect(type: string, index: number) {
    switch (type) {
      case 'auto':
        this.pledges[index].pledgeType = 'auto';
        await this.profileController.getPledgeType(PledgeDataType.AUTO).then(res => this.pledges[index].filters = res);
        break;
      case 'realEstate':
        this.pledges[index].pledgeType = 'realEstate';
        await this.profileController.getPledgeType(PledgeDataType.PROPERTY).then(res => {
          this.pledges[index].filters = res;
        });
        break;
    }

  }

  loadPledges() {
    let i = 0;
    this.profileController.getPledges().then(async it => {
      for (const x of it) {
        if (x.typeOfPledge === 'auto') {
          this.addPledge(x.id);
          await this.onChangeSelect('auto', i);
        } else if (x.typeOfPledge === 'realEstate') {
          this.addPledge(x.id);
          await this.onChangeSelect('realEstate', i);
        }
        this.pledges[i].name = x.title;
        this.pledges[i].pledgeType = x.typeOfPledge;

        for (let j = 0; j < this.pledges[i]?.filters.length; j++) {
          this.initLogicForFilters(i, j, x);
        }
        i += 1;
      }
    });
  }

  addPledge(id?: number) {
    let currentId: number;
    let pledge: PledgeData;
    if (!id) {
      currentId = 0;
      pledge = { id: currentId, filters: [], name: '', changeName: true, pledgeType: '' };
    } else {
      currentId = id;
      pledge = { id: currentId, filters: [], name: '', changeName: false, pledgeType: '' };
    }
    this.pledges.push(pledge);
    this.numberOfAddedPledges += 1;
  }

  savePledge() {
    if (this.pledges.length === 0 || this.pledgeList.length === 0) {
      return;
    }
    this.profileController.savePledges(this.pledgeList).then(res => {
      this.pledgeList = [];
    });
  }

  changeName(name: string, index: number) {
    this.pledges[index].name = name;
  }

  changeValue(table: string, name: string, index: number) {
    const value: PledgeValue = { table: table, name: name };
    if (!this.pledgeList[index]) {
      this.pledgeList[index] = { id: this.pledges[index].id, pledgeValues: [], title: '', pledgeType: '' };
      this.pledgeList[index].pledgeValues.push(value);
      this.pledgeList[index].title = this.pledges[index].name;
      this.pledgeList[index].pledgeType = this.pledges[index].pledgeType;
    }

    for (let i = 0; i < this.pledgeList[index]?.pledgeValues.length; i++) {
      if (this.pledgeList[index].pledgeValues[i].table === value.table) {
        this.pledgeList[index].pledgeValues[i] = value;
        return;
      }
    }
    this.pledgeList[index]?.pledgeValues.push(value);
    this.pledgeList[index].title = this.pledges[index].name;
    this.pledgeList[index].pledgeType = this.pledges[index].pledgeType;
  }

  deletePledge(index: number) {
    this.numberOfAddedPledges -= 1;

    if (this.pledges[index]?.id === 0) {
      this.pledges.splice(index, 1);
      this.pledgeList.splice(index, 1);
      return;
    }
    this.profileController.deletePledge(this.pledges[index].id).then(() => {
      this.pledges.splice(index, 1);
    });
  }

  private initLogicForFilters(i: number, j: number, x: Pledge): boolean {
    switch (this.pledges[i].filters[j]?.dict) {
      case 'countryOfManufacture':
        this.pledges[i].filters[j].value = x.countryOfManufacture;
        return true;

      case 'ageOfPledger':
        this.pledges[i].filters[j].value = x.ageOfPledger;
        return true;

      case 'location':
        this.pledges[i].filters[j].value = x.location;
        return true;

      case 'amountOfPrepayment':
        this.pledges[i].filters[j].value = x.amountOfPrepayment;
        return true;

      case 'typeOfBuilt':
        this.pledges[i].filters[j].value = x.typeOfBuilt;
        return true;

      case 'yearOfBuilt':
        this.pledges[i].filters[j].value = x.yearOfBuilt;
        return true;

      case 'yearOfRelease':
        this.pledges[i].filters[j].value = x.yearOfRelease;
        return true;

      case 'typeOfVehicle':
        this.pledges[i].filters[j].value = x.typeOfVehicle;
        return true;

      case 'typeOfPledge':
        this.pledges[i].pledgeType = x.typeOfPledge;
        this.pledges[i].filters[j].value = x.typeOfPledge;
        return true;

      case 'wallMaterial':
        this.pledges[i].filters[j].value = x.wallMaterial;
        return true;
    }

    return false;
  }
}
