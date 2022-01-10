import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AllFilters} from '@finance-web/models/all-filters/AllFilters';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {FilterList} from '@finance-web/models/all-filters/FilterList';
import {FilterToProduct} from '@finance-web/models/all-filters/FilterToProduct';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ParameterType} from '@finance-web/models/product/ParameterType';
import {addNoChooseValue, changeFilter} from '@finance-web/app/shares/util-method';

@Component({
  selector: 'app-all-filters',
  templateUrl: './all-filters.component.html',
  styleUrls: ['./all-filters.component.scss']
})
export class AllFiltersComponent implements OnInit {

  @Input() pageTabFilter: string;
  @Input() filterList: FilterList;

  @Output() filterListChange = new EventEmitter<FilterList>();

  filter: FilterToProduct;

  filters: AllFilters[] = [];
  borrowersFilter: AllFilters[];
  pledgeFilter: AllFilters[] = [];
  pledgeAutoFilter: AllFilters[] = [];
  pledgePropertyFilter: AllFilters[] = [];

  employment: string = '';
  creditHistory: string = '';
  pledgeSwitch: string = '';
  labelPledgeSwitch: string = '';

  isBorrowerSwitch: boolean = false;
  isPledgeSwitch: boolean = false;
  isPledgeAutoSwitch: boolean = false;
  isSwitcher: boolean = true;
  isErrorInput: boolean = false;

  mform: FormGroup = new FormGroup({
    filters: new FormControl(this.filters),
    paging: new FormControl(),
    tabName: new FormControl()
  });

  constructor(private creditConsumerController: CreditConsumerController) {
  }

  ngOnInit(): void {
    this.creditConsumerController.getFilter(this.pageTabFilter).then(res => {
      this.filters = res;
      if (this.pageTabFilter === 'mortgageLoan' || this.pageTabFilter === 'carLoan') {
        this.filters = this.filters.filter(x => x.dict != 'initialFee');
      }
      addNoChooseValue(this.filters);

      const index = this.filters.findIndex(f => f.dict === 'collateral');

      if (index !== -1) {

        const indexAuto = this.filters[index].values.findIndex(ind => ind.dict === 'auto');
        if (indexAuto !== -1) {
          this.creditConsumerController.getFilter('pledgeAuto').then(res => {
            this.pledgeAutoFilter = res;
            addNoChooseValue(this.pledgeAutoFilter);
          });
        }

        const indexProperty = this.filters[index].values.findIndex(ind => ind.dict === 'realEstate');
        if (indexProperty !== -1) {
          this.creditConsumerController.getFilter('pledgeProperty').then(res => {
            this.pledgePropertyFilter = res;
            addNoChooseValue(this.pledgePropertyFilter);
          });
        }
      }

      this.creditConsumerController.getFilter('borrower').then(res => {
        this.borrowersFilter = res;
        addNoChooseValue(this.borrowersFilter);
      });
    });

    this.mform.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data => this.filterListChange.emit(data));
  }

  isBorrowerOn() {
    this.isBorrowerSwitch = !this.isBorrowerSwitch;
  }

  isPledgeOn() {
    this.isPledgeSwitch = !this.isPledgeSwitch;

    if (this.isPledgeSwitch) {
      if (this.pledgeSwitch === 'pledgeAuto') {
        this.pledgeFilter = this.pledgeAutoFilter;
      } else if (this.pledgeSwitch === 'pledgeProperty') {
        this.pledgeFilter = this.pledgePropertyFilter;
      }
    } else {
      if (this.pledgeFilter) {
        this.filterRefresh(this.pledgeFilter);
      }
    }
  }

  filterListChangedMethod(title: string, type: string, event: any) {
    this.filter = {
      title: title,
      type: type as ParameterType,
      value: type === ParameterType.DICT || type === ParameterType.MULTI_DICT
      || type === ParameterType.DATE_SELECTOR || type === ParameterType.COMBO_DICT || type === ParameterType.SELECTOR
        ? event : event.target.value
    };

    if (type === ParameterType.DATE_SELECTOR && this.filter.value) {
      this.filter.value = this.filter.value?.split(' ')[0] + ' ' + this.filter.value?.split(' ')[1];
    }

    if (this.checkValue(this.filter.value, this.filter.title)) {
      return;
    }

    if ((type === ParameterType.DICT || type === ParameterType.MULTI_DICT) && title === 'collateral' && event === 'auto') {
      this.isPledgeAutoSwitch = true;
      this.pledgeSwitch = 'pledgeAuto';
      this.labelPledgeSwitch = 'collateral_vehicle_data';
      this.isPledgeSwitch = false;
      this.filterRefresh(this.pledgePropertyFilter);

    } else if ((type === ParameterType.DICT || type === ParameterType.MULTI_DICT) && title === 'collateral' && event === 'realEstate') {
      this.isPledgeAutoSwitch = true;
      this.isPledgeSwitch = false;
      this.labelPledgeSwitch = 'collateral_property_data';
      this.pledgeSwitch = 'pledgeProperty';
      this.filterRefresh(this.pledgeAutoFilter);
    } else if ((type === ParameterType.DICT || type === ParameterType.MULTI_DICT) && title === 'collateral') {
      this.isPledgeAutoSwitch = false;
      this.isPledgeSwitch = false;
      this.labelPledgeSwitch = '';
      this.filterRefresh(this.pledgeAutoFilter);
      this.filterRefresh(this.pledgePropertyFilter);
    }

    changeFilter(this.filter, this.filterList, this.mform);

  }

  switchFilterChange(title: string, type: string, event: any) {
    this.filter = {
      title: title,
      type: type as ParameterType,
      value: this.getValue(type, event)
    };

    if (this.filter.value?.length === 0) {
      this.isErrorInput = false;
    } else if (Number(this.filter.value) < 1) {
      this.isErrorInput = true;
    }

    this.isErrorInput = false;

    if (this.checkValue(this.filter.value, this.filter.title)) {
      return;
    }
    changeFilter(this.filter, this.filterList, this.mform);
  }

  getValue(type: string, event: any) {
    if (type === ParameterType.DICT || type === ParameterType.MULTI_DICT
      || type === ParameterType.NOT_MULTI_DICT
      || type === ParameterType.SELECTOR) {
      return event;
    } else if (type === ParameterType.DICT_CREDIT_HISTORY) {
      let val = "";
      for (const x of event) {
        val += x + ",";
      }
      val = val.slice(0, -1);
      return val;
    }
    return event.target.value;
  }

  filterRefresh(filterByClear: any) {
    filterByClear.forEach((item) => {
      this.filterList.filters = this.filterList.filters.filter(f => f.title !== item.dict);
    });
    this.mform.setValue(this.filterList);
  }

  private checkValue(value: any, title: string): boolean {
    if (!value || value === '') {
      const filter_index = this.filterList.filters.findIndex(f => f.title === title);
      if (filter_index != -1) {
        this.filterList.filters.splice(filter_index, 1);
      }
      this.mform.setValue(this.filterList);
      return true;
    }
    return false;
  }

  getOptionValue(dict: string) {
    if (dict === 'nothingIsChosen') {
      return null;
    }
    return dict;
  }

  changedComboDict(event: FilterToProduct) {
    if (this.checkValue(event.value, event.title)) {
      return;
    }
    changeFilter(event, this.filterList, this.mform);
  }
}
