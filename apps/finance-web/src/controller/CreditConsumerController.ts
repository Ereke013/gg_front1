import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { AllFilters } from '@finance-web/models/all-filters/AllFilters';
import { ProductCard } from '@finance-web/models/product/ProductCard';
import { FilterList } from '@finance-web/models/all-filters/FilterList';
import { SortingParameter } from '@finance-web/models/all-filters/SortingParameter';
import { FavoriteRecord } from '@finance-web/models/favorite/FavoriteRecord';
import { ClientAction } from '@finance-web/models/reportAction/ClientAction';
import { ClientLocation } from '@finance-web/models/location/ClientLocation';
import { ApplicationCard } from '@finance-web/models/product_card/ApplicationCard';
import { ApplicationCardRequest } from '@finance-web/models/product_card/ApplicationCardRequest';
import { Dict } from '@finance-web/models/dict/Dict';
import {RepaymentTable} from "@finance-web/models/product_card/RepaymentTable";
import {BankProductToShow} from "@finance-web/models/bank_product/BankProductToShow";

@Injectable({ providedIn: 'root' })
export class CreditConsumerController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('consumer-credit');
  }

  getFilter(filterType: string): Promise<AllFilters[]> {
    return this.http.get<AllFilters[]>('/get-filter', { filterType: filterType })
      .toPromise()
      .then(response => response.body);
  }

  getTabs(): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-tabs')
      .toPromise()
      .then(response => response.body);
  }

  getProductCard(filterList: FilterList): Promise<ProductCard[]> {
    return this.http.postJson<ProductCard[]>('/get-product-card', filterList)
      .toPromise()
      .then(response => response.body);
  }

  getProductCardCount(filterList: FilterList): Promise<number> {
    return this.http.postJson<number>('/get-product-count', filterList)
      .toPromise()
      .then(response => response.body);
  }

  getSortingParams(): Promise<SortingParameter[]> {
    return this.http.get<SortingParameter[]>('/get-sorting-parameters')
      .toPromise()
      .then(response => response.body);
  }

  saveFavorite(favoriteRecord: FavoriteRecord): Promise<FavoriteRecord> {
    return this.http.postJson<FavoriteRecord>('/save-favorite', favoriteRecord)
      .toPromise()
      .then(response => response.body);
  }

  deleteFavorite(productId: number): Promise<number> {
    return this.http.post<number>('/delete-favorite', { productId: productId })
      .toPromise()
      .then(response => response.body);
  }

  saveClientAction(action: ClientAction) {
    return this.http.postJson('/click-place', action)
      .toPromise()
      .then(response => response.body);
  }

  getLocations(): Promise<ClientLocation[]> {
    return this.http.get<ClientLocation[]>('/get-city-locations')
      .toPromise()
      .then(response => response.body);
  }

  getCityByCode(cityCode: string): Promise<string> {
    return this.http.get<string>('/get-city', { cityCode: cityCode })
      .toPromise()
      .then(response => response.body);
  }

  getApplicationCard(applicationCardRequest: ApplicationCardRequest): Promise<ApplicationCard> {
    return this.http.postJson<ApplicationCard>('/get-application-card', applicationCardRequest)
      .toPromise()
      .then(response => response.body);
  }

  getPaymentCard(cardRequest: ApplicationCardRequest): Promise<RepaymentTable[]> {
    return this.http.postJson<RepaymentTable[]>('/get-repayment-card', cardRequest)
      .toPromise()
      .then(response => response.body);
  }

  getBankContact(id: number): Promise<BankProductToShow> {
    return this.http.get<BankProductToShow>('/get-bank-contacts', { id, city: localStorage.getItem('location') })
      .toPromise()
      .then(response => response.body);
  }
}
