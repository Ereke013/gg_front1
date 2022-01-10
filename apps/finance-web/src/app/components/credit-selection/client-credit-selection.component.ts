import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {AllFilters} from '@finance-web/models/all-filters/AllFilters';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {FilterToProduct} from '@finance-web/models/all-filters/FilterToProduct';
import {FilterList} from '@finance-web/models/all-filters/FilterList';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {ParameterType} from '@finance-web/models/product/ParameterType';
import {changeFilter} from '@finance-web/app/shares/util-method';
import {SubSink} from '@finance.workspace/shared/util';

@Component({
  selector: 'app-client-credit-selection',
  templateUrl: './client-credit-selection.component.html',
  styleUrls: ['./client-credit-selection.component.scss']
})
export class ClientCreditSelectionComponent implements OnInit, OnChanges, OnDestroy {

  @Input() pageTabFilter: string;
  @Input() isSumOfCreditTitleChanged: boolean;

  filters: AllFilters[] = [];

  sumCreditInt: number = null;
  termCredit: number = null;
  initialFee: number = null;


  maxCreditSumSelection = 100_000_000;
  stepSumSelection: number = 10000;

  sumCreditInputMask = '0000000000';
  termSelect: string;

  isDeleteIconSumOfCredit: boolean = true;
  isDeleteIconTermOfCredit: boolean = true;
  isDeleteIconInitialFeeOfCredit: boolean = true;
  isStatic: boolean = true;
  isFilterClicked: boolean = false;
  isTg: boolean = false;

  filter: FilterToProduct;
  filterListChange: FilterList = {
    filters: [], paging: {limit: 10, offset: 0}, tabName: ''
  };

  private subSink = new SubSink();

  termSelectList: string[] = [
    'month', 'year'
  ];

  mform: FormGroup = new FormGroup({
    filters: new FormControl(this.filters),
    paging: new FormControl(),
    tabName: new FormControl('')
  });

  @Output() filterList = new EventEmitter<FilterList>();
  @Output() selectionTermType = new EventEmitter<string>();

  constructor(private creditConsumerController: CreditConsumerController,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.creditConsumerController.getFilter('static').then(res => {
      if (res.length < 2) {
        this.isStatic = false;
      } else {
        this.filters = res;
      }
    });
    this.termSelect = 'month';

    this.subSink.sink = this.mform.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(data => this.filterList.emit(data));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isFilterClicked = false;
    if (changes.pageTabFilter.currentValue !== changes.pageTabFilter.previousValue) {
      this.filterListChange.filters = [];
      this.sumCreditInt = null;
      this.termCredit = null;
      this.initialFee = null;
      this.isDeleteIconTermOfCredit = true;
      this.isDeleteIconSumOfCredit = true;
      this.isDeleteIconInitialFeeOfCredit = true;
    }

  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  onClearSumOfCredit() {
    this.sumCreditInt = null;
    this.isDeleteIconSumOfCredit = true;
    this.changeSum();
  }

  onClearInitialFee() {
    this.initialFee = null;
    this.isDeleteIconInitialFeeOfCredit = true;
    this.changeFee();
  }

  onClearTermOfCredit() {
    this.termCredit = null;
    this.isDeleteIconTermOfCredit = true;
    this.changeTerm();
  }

  onClicked() {
    this.isFilterClicked = !this.isFilterClicked;
  }

  changeSum() {

    if (this.sumCreditInt?.toString().startsWith('0')) {
      this.cdr.detectChanges();
      this.sumCreditInt = 1;
      return;
    }

    if ((this.pageTabFilter === "mortgageLoan" || this.pageTabFilter === "carLoan") && this.initialFee < 1) {
      return;
    }

    if (this.checkValue(this.sumCreditInt, this.filters[0].dict)) {
      return;
    }

    this.filter = {
      title: this.filters[0].dict,
      type: this.filters[0].type as ParameterType,
      value: this.sumCreditInt ? (this.sumCreditInt.toString()) : ''
    };

    changeFilter(this.filter, this.filterListChange, this.mform);

    this.isDeleteIconSumOfCredit = !this.sumCreditInt;
  }

  changeTerm() {

    if (this.termCredit?.toString().startsWith('0')) {
      this.cdr.detectChanges();
      this.termCredit = 1;
      return;
    }

    if (this.checkValue(this.termCredit, this.filters[1].dict)) {
      return;
    }

    this.filter = {
      title: this.filters[1].dict,
      type: this.filters[1].type as ParameterType,
      value: this.termFilterValue()
    };

    changeFilter(this.filter, this.filterListChange, this.mform);
    this.selectionTermType.emit(this.termSelect);

    this.isDeleteIconTermOfCredit = !this.termCredit;
  }

  termFilterValue() {
    if (this.termCredit) {
      if (this.termSelect === 'year') {
        return ((this.termCredit * 12).toString());
      }
      return (this.termCredit.toString());
    }
    return '';
  }

  termSelectChange() {
    if (this.termCredit) {
      this.changeTerm();
    }
  }

  checkValue(value: any, title: string) {
    if (!value) {
      const filter_index = this.filterListChange.filters.findIndex(f => f.title === title);
      if (filter_index != -1) {
        this.filterListChange.filters.splice(filter_index, 1);
      }
      this.mform.setValue(this.filterListChange);
      return true;
    } else {
      if (value < 200_000) {
        this.stepSumSelection = 10000;
      } else {
        this.stepSumSelection = 20000;
      }

      if (value < 1_000_000) {
        this.stepSumSelection = 20000;
      } else {
        this.stepSumSelection = 50000;
      }
    }
    return false;
  }

  changeFilterList(event: FilterList) {
    this.filterList.emit(event);
  }

  changeFee() {

    if (this.initialFee > 100) {
      this.cdr.detectChanges();
      this.initialFee = 100;
    }

    if (this.checkValue(this.initialFee, 'initialFee')) {
      return;
    }

    this.filter = {
      title: 'initialFee',
      type: 'RANGE' as ParameterType,
      value: this.initialFee ? (this.initialFee.toString()) : ''
    };

    changeFilter(this.filter, this.filterListChange, this.mform);
    this.changeSum();

    this.isDeleteIconInitialFeeOfCredit = !this.initialFee;
  }

  sliderChange(value: number) {
    if (value < 4000) {
      return;
    }
    this.sumCreditInt = value;
  }
}
