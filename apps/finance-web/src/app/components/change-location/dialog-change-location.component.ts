import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientLocation } from '@finance-web/models/location/ClientLocation';
import { CreditConsumerController } from '@finance-web/controller/CreditConsumerController';
import {LocationInformation} from "@finance-web/models/location/LocationInformation";

@Component({
  selector: 'app-dialog-change-location',
  templateUrl: './dialog-change-location.component.html',
  styleUrls: ['./dialog-change-location.component.scss']
})
export class DialogChangeLocationComponent implements OnInit {

  cities: ClientLocation[];

  selectedCity: string;


  constructor(public dialog: MatDialog,
              private clientController: CreditConsumerController) {
  }

  ngOnInit(): void {
    this.getCities();
    this.selectedCity = localStorage.getItem('location');
  }

  getCities() {
    this.clientController.getLocations().then(res => {
      this.cities = res;
    });
  }

  setCity(city: LocationInformation) {
    localStorage.setItem('location', city.cityCode);
  }
}
