import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {ScreenUtil} from '@finance-web/app/shares/ScreenUtil';
import {DialogChangeLocationComponent} from '@finance-web/app/components/change-location/dialog-change-location.component';
import {MatDialog} from '@angular/material/dialog';
import {Dict} from '@finance-web/models/dict/Dict';
import {PageTab} from '@finance-web/models/default_enums/PageTab';
import {FilterType} from '@finance-web/models/default_enums/FilterType';
import {LanguageService} from "@finance-web/services/language.service";
import {DefaultModel} from "@finance-web/models/location/DefaultModel";

@Component({
  selector: 'app-consumer-credit-header',
  templateUrl: './consumer-credit-header.component.html',
  styleUrls: ['./consumer-credit-header.component.scss']
})
export class ConsumerCreditHeaderComponent implements OnInit {
  tabs: Dict[] = [];
  selectedTab: Dict;

  isSave: boolean = false;
  isChange: boolean = false;
  isMobile: boolean = false;

  cityLocation: string = '';
  cityCode: string;

  @Output() selectedTabs = new EventEmitter<string>();

  constructor(private creditConsumerController: CreditConsumerController,
              private languageService: LanguageService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.setLocationCity();

    this.creditConsumerController.getTabs().then(res => {
      this.tabs = res;
      this.selectedTab = this.tabs[0];
      this.replaceTab();
    });

    this.isMobile = ScreenUtil.isSmall;
  }

  clickTab(tab: Dict) {
    this.selectedTab = tab;
    this.replaceTab();
  }

  selectLocation() {
    this.isSave = true;
  }

  replaceTab() {
    if (this.selectedTab) {
      switch (this.selectedTab.dict) {
        case FilterType.PLEDGE_CREDIT:
          this.selectedTabs.emit(PageTab.SECURED_LOAN);
          break;
        case FilterType.CREDIT_WITHOUT_PLEDGE:
          this.selectedTabs.emit(PageTab.UNSECURED_LOAN);
          break;
        case FilterType.MORTGAGE:
          this.selectedTabs.emit(PageTab.MORTGAGE_LOAN);
          break;
        case FilterType.CAR_CREDIT:
          this.selectedTabs.emit(PageTab.CAR_LOAN);
          break;
      }
    }
  }

  setLocationCity() {
    this.cityCode = localStorage.getItem('location');
    if (!this.cityCode) {
      this.cityCode = DefaultModel.ALMATY_LOCATION;
      localStorage.setItem('location', this.cityCode);
    }
    this.creditConsumerController.getCityByCode(this.cityCode).then(res => {
      this.cityLocation = res;
    });
  }

  refreshPage(cityCode: string) {
    if (localStorage.getItem('location') !== cityCode) {
      window.location.reload();
    }
  }

  changeLocation() {
    const dialogRef = this.dialog.open(DialogChangeLocationComponent, {
      restoreFocus: false,
      autoFocus: false,
      height: '80vh'
    });

    dialogRef.afterClosed().subscribe(() => {
      const cityCode = this.cityCode;
      this.setLocationCity();
      this.refreshPage(cityCode);
    });
  }

  cityByLang(cityName: string) {
    if (this.languageService.currentLanguageCode === 'en') {
      return cityName;
    } else if (this.languageService.currentLanguageCode === 'kk') {
      return cityName + ' қ.';
    } else
      return 'г. ' + cityName;
  }


}
