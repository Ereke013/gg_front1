import { Component, OnInit } from '@angular/core';
import { FilterList } from '@finance-web/models/all-filters/FilterList';
import { ClientAction } from '@finance-web/models/reportAction/ClientAction';
import { PageTab } from '@finance-web/models/default_enums/PageTab';

@Component({
  selector: 'app-credit-selection',
  templateUrl: './credit-selection.component.html',
  styleUrls: ['./credit-selection.component.scss']
})
export class CreditSelectionComponent implements OnInit {

  pageTab: string;
  termType: string;

  filterList: FilterList = {
    filters: [], paging: {limit: 10, offset: 0}, tabName: ''
  };
  clickData: ClientAction;

  isSumOfCreditTitleChanged: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  setPageTab(event: any) {
    this.pageTab = event;
    this.isSumOfCreditTitleChanged = event === PageTab.MORTGAGE_LOAN || event === PageTab.CAR_LOAN;
  }

  setFilterList(event: any) {
    this.filterList = event;
  }

  termSelected(event: string) {
    this.termType = event;
  }
}
