import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CreditConsumerController} from '@finance-web/controller/CreditConsumerController';
import {ProductCard} from '@finance-web/models/product/ProductCard';
import {FilterList} from '@finance-web/models/all-filters/FilterList';
import {FilterToProduct} from '@finance-web/models/all-filters/FilterToProduct';
import {SortingParameter} from '@finance-web/models/all-filters/SortingParameter';
import {OrderState} from '@finance.workspace/shared/model';
import {ScreenUtil} from '@finance-web/app/shares/ScreenUtil';
import {StaticFilter} from '@finance-web/models/default_enums/StaticFilter';
import {FavoriteRecord} from '@finance-web/models/favorite/FavoriteRecord';
import {PageTab} from '@finance-web/models/default_enums/PageTab';
import {FilterType} from '@finance-web/models/default_enums/FilterType';
import {ClientAction} from '@finance-web/models/reportAction/ClientAction';
import {DatePipe} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {DialogBankContactsComponent} from '@finance-web/app/components/dialog-bank-contacts/dialog-bank-contacts.component';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {SubSink} from '@finance.workspace/shared/util';
import {ApplicationCardComponent} from '@finance-web/app/components/product-card/application-card.component';
import {ApplicationCardRequest} from '@finance-web/models/product_card/ApplicationCardRequest';
import {numberWithSpaces} from '@finance-web/app/shares/util-method';
import {DefaultModel} from "@finance-web/models/location/DefaultModel";

@Component({
  selector: 'app-consumer-credit',
  templateUrl: './consumer-credit.component.html',
  styleUrls: ['./consumer-credit.component.scss']
})
export class ConsumerCreditComponent implements OnInit, OnChanges, OnDestroy {

  @Input() filterList: FilterList;
  @Input() pageTab: string;
  @Input() termType: string;
  @Input() isFavorite: boolean = false;

  productCards: ProductCard[] = [];
  sortByList: SortingParameter[];
  currentSortParameter: SortingParameter = null;

  filter: FilterToProduct;
  applicationClickInfo: ClientAction;

  amountOfResults: number;
  offset: number = 0;

  resultString: string;

  isLoadMoreBtn: boolean = true;
  isLoading: boolean = false;
  isMobile: boolean = false;
  isScrolled: boolean = false;
  isBankContact: boolean = false;
  isFavoriteClick: boolean = false;

  sortedParam: string;

  subSink = new SubSink();
  scroll = new Subject<number>();

  tabs: string[] = ['pledgeCredit', 'creditWithoutPledge', 'mortgage', 'сarCredit'];
  tabFavorite: string = 'pledgeCredit';

  constructor(private creditConsumerController: CreditConsumerController,
              private datePipe: DatePipe,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.pageTab) {
      this.pageTab = this.tabs[0];
    }
    this.subSink.sink = fromEvent(window, 'scroll')
      .pipe(debounceTime(200))
      .subscribe(() => this.dealWithScroll(window.scrollY));

    this.isMobile = ScreenUtil.isSmall;
  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.pageTab?.currentValue !== changes.pageTab?.previousValue){
      this.filterList.filters = [];
    }
    this.query().then();
  }

  ngOnDestroy() {
    this.subSink.unsubscribe();
  }

  dealWithScroll(y: number) {
    this.isScrolled = y !== 0;
  }

  async query() {
    this.isLoading = true;

    this.replaceTab();

    if (!this.sortByList) {
      await this.creditConsumerController.getSortingParams().then((res) => {
        this.sortByList = res;
        if (this.sortByList?.length > 0) {
          this.sortByList[0].ordering = OrderState.DESC;
          this.setOrdering(this.sortByList[0], this.sortByList[0].name);
        }
      });
    }


    if (this.isFavorite) {
      this.filterList.tabName = this.pageTab;
      this.filterList.isFavorite = this.isFavorite;
      this.filterList.ordering = this.currentSortParameter;
      this.getProductsAmount();
      this.getProductCard();
      return;
    }

    this.defaultFilterValue();

    if (!this.filterList.paging) {
      this.filterList.paging = {limit: 10, offset: this.offset};
    }
    this.filterList.city = localStorage.getItem('location');
    this.filterList.tabName = this.pageTab;
    if (this.filterList?.paging.limit === 0) {
      this.filterList.paging.limit = this.filterList.paging.limit + 10;
    }
    this.filterList.paging.offset = 0;
    this.filterList.ordering = this.currentSortParameter;
    this.filterList.isFavorite = this.isFavorite;

    this.getProductsAmount();
    this.getProductCard();
  }

  defaultFilterValue() {
    if (!this.filterList || this.filterList?.filters.length === 0) {
      this.filterList = {filters: [], paging: {limit: 0, offset: this.offset}, ordering: this.currentSortParameter};
    }
  }

  getProductsAmount() {
    this.creditConsumerController.getProductCardCount(this.filterList).then(res => {
        this.amountOfResults = res;
        if (res % 10 === 1) {
          this.resultString = 'result';
        } else if (res % 10 === 2 || res % 10 === 3 || res % 10 === 4) {
          this.resultString = 'result_a';
        } else if (res % 10 === 0 || res % 10 === 5 || res % 10 === 6 || res % 10 === 7 || res % 10 === 8 || res % 10 === 9) {
          this.resultString = 'result_ov';
        }
      }
    );
  }

  getProductCard() {
    this.creditConsumerController.getProductCard(this.filterList).then((res) => {
        this.productCards = res;
        this.isLoading = false;
        if (this.productCards.length >= this.amountOfResults) {
          this.isLoadMoreBtn = false;
        } else if (this.amountOfResults > this.productCards.length) {
          this.isLoadMoreBtn = true;
        }
      }
    );
  }

  loadMoreProducts() {
    this.filterList.paging.offset += 10;
    this.offset += 10;
    this.getByPagination();
  }

  setOrdering(sort: SortingParameter, sortname: any) {
    this.currentSortParameter = sort;
    this.sortedParam = sortname;
    switch (sort.ordering) {
      case OrderState.UNSET:
        this.currentSortParameter.ordering = OrderState.ASC;
        break;
      case OrderState.DESC:
        this.currentSortParameter.ordering = OrderState.ASC;
        break;
      case OrderState.ASC:
        this.currentSortParameter.ordering = OrderState.DESC;
        break;
    }

    this.query().then();
  }

  getByPagination() {
    this.isLoading = true;
    setTimeout(() => {
      this.creditConsumerController.getProductCard(this.filterList).then(res => {
        res.forEach(x => {
          const idx = this.productCards.filter(re => re.id === x.id)[0];
          if (x && !idx) {
            this.productCards.push(x);
          }
        });
        this.isLoading = false;
        if (this.productCards.length >= this.amountOfResults) {
          this.isLoadMoreBtn = false;
        }
      });
      // this.isLoading = false;
    }, 500);

  }

  replaceTab() {
    if (this.pageTab) {
      switch (this.pageTab) {
        case PageTab.SECURED_LOAN:
          this.pageTab = FilterType.PLEDGE_CREDIT;
          break;
        case PageTab.UNSECURED_LOAN:
          this.pageTab = FilterType.CREDIT_WITHOUT_PLEDGE;
          break;
        case PageTab.MORTGAGE_LOAN:
          this.pageTab = FilterType.MORTGAGE;
          break;
        case PageTab.CAR_LOAN:
          this.pageTab = FilterType.CAR_CREDIT;
          break;
      }
    }
  }

  saveToFavorites(record: ProductCard, index: number) {


    this.isFavoriteClick = true;
    const favorite = {productId: record.id} as FavoriteRecord;

    this.filterList.filters.forEach(it => {
      if (it.title == StaticFilter.CREDIT_AMOUNT) {
        favorite.sum = it.value;
      } else if (it.title == StaticFilter.CREDIT_TERM) {
        favorite.term = it.value;
      } else if ((this.pageTab === 'carCredit' || this.pageTab === 'mortgage') || it.title == StaticFilter.INITIAL_FEE) {
        favorite.initialFee = it.value;
      }
    });

    this.creditConsumerController.saveFavorite(favorite).then(() => this.productCards[index].isFavorite = true)
      .catch(error => console.clear());

  }

  deleteFromFavorites(record: ProductCard, index: number) {
    this.isFavoriteClick = true;
    this.creditConsumerController.deleteFavorite(record.id).then(() => this.productCards[index].isFavorite = false);
  }

  sendApplication(values, index, nameProduct, bankCode) {
    if (this.isBankContact || this.isFavoriteClick) {
      return;
    }
    const applicationCardRequest: ApplicationCardRequest = {
      id: this.productCards[index].id,
      sumOfCredit: '',
      termOfCredit: '',
      initialFee: '',
      pageTab: this.pageTab
    };
    this.filterList.filters.forEach(it => {
      if (it.title === 'creditAmount') {
        applicationCardRequest.sumOfCredit = it.value;
      } else if (it.title === 'creditTerm') {
        applicationCardRequest.termOfCredit = it.value;
        if (this.termType === 'year') {
          applicationCardRequest.termOfCredit = (Number(applicationCardRequest.termOfCredit) / 12).toString();
        }
      } else if (it.title === 'initialFee') {
        applicationCardRequest.initialFee = it.value;
      }
    });

    if (!applicationCardRequest.sumOfCredit) {
      applicationCardRequest.sumOfCredit = this.productCards[index].sumOfCredit ? this.productCards[index].sumOfCredit : '';
    }
    if (!applicationCardRequest.termOfCredit) {
      applicationCardRequest.termOfCredit = this.productCards[index].termOfCredit ? this.productCards[index].termOfCredit : '';
    }
    if (!applicationCardRequest.initialFee) {
      applicationCardRequest.initialFee = this.productCards[index].initialFee ? this.productCards[index].initialFee : null;
    }

    const dialogRef = this.dialog.open(ApplicationCardComponent, {
      restoreFocus: false,
      autoFocus: false,
      width: ScreenUtil.isSmall ? '100vw' : '55vw',
      height: '85vh',
      maxWidth: 'none',
      panelClass: 'product-card',
      data: {applicationCardRequest: applicationCardRequest, termType: this.termType,},

    });

    this.applicationClickInfo = {
      curDate: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      branch: DefaultModel.ALMATY_LOCATION,
      nameOfProduct: nameProduct,
      nameFO: bankCode,
      placeInList: index
    };
    this.creditConsumerController.saveClientAction(this.applicationClickInfo).then();
  }

  openBankContacts(index: number) {
    this.isBankContact = true;

    const width = this.isMobile ? '70vw' : '50vw';

    const bankData = {
      id: this.productCards[index].id,
      logo: this.productCards[index].logo,
      title: this.productCards[index].title
    };

    const dialogRef = this.dialog.open(DialogBankContactsComponent, {
      restoreFocus: false,
      width: width,
      panelClass: 'bank-contacts-dialog',
      data: bankData,
      minHeight: '20vh'
    });

    dialogRef.afterClosed().subscribe(data => {
      this.isBankContact = false;
    });

  }

  scrollTop() {
    window.scroll(0, 0);
  }

  numberDivide(value: string) {
    if (Number(value)) {
      return numberWithSpaces(value);
    }
    return value;
  }

  setTabForFavorite(event: string) {
    this.pageTab = event;
    this.query().then();
  }
}
