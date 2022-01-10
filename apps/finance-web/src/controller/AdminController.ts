import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { ProductParameterToSave } from '../models/product/ProductParameterToSave';
import { DynamicTable } from '@finance-web/models/dynamic_table/DynamicTable';
import { Dict } from '@finance-web/models/dict/Dict';
import { Product } from '@finance-web/models/product/Product';
import { CheckBoxElement } from '@finance-web/models/help/CheckBoxElement';
import { ProductParameterSettingToSave } from '@finance-web/models/product/ProductParameterSettingToSave';
import { TableFilter } from '@finance-web/models/filter/TableFilter';
import { DictToSave } from '@finance-web/models/dict/DictToSave';
import { DictToSaveValue } from '@finance-web/models/dict/DictToSaveValue';
import { SelectItem } from '@finance-web/models/help/SelectItem';
import { ProductParameterForFilter } from '@finance-web/models/product/ProductParameterForFilter';
import { RolesRecord } from '@finance-web/models/roles/RolesRecord';
import { NewsRecord } from '@finance-web/models/news/NewsRecord';
import {AdditionCredit} from "@finance-web/models/credit_history/AdditionCredit";
import {response} from "express";

@Injectable({ providedIn: 'root' })
export class AdminController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('admin');
  }

  saveProductParameter(parameter: ProductParameterToSave): Promise<ProductParameterToSave> {
    return this.http.postJson<ProductParameterToSave>('/save-product-parameter', parameter)
      .toPromise()
      .then(response => response.body);
  }

  getProductParameterTable(filter: TableFilter): Promise<DynamicTable> {
    return this.http.get<DynamicTable>('/get-product-parameter-table', { filter })
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  deleteProductParameter(id: number) {
    this.http.post<number>('/delete-product-parameter', { id })
      .toPromise()
      .then(response => response.body as number);
  }

  getProductParameterDetail(id: number): Promise<ProductParameterToSave> {
    return this.http.get<ProductParameterToSave>('/product-parameter-detail', { id })
      .toPromise()
      .then(response => response.body as ProductParameterToSave);
  }

  getProductParameterSelectItems(id: number): Promise<SelectItem> {
    return this.http.get<SelectItem>('/product-parameter-select-items', { id })
      .toPromise()
      .then(response => response.body);
  }

  getParameterDictValues(id: number): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-sub-parameters-select-items', { id })
      .toPromise()
      .then(response => response.body as Dict[]);
  }

  getProductParametersForFilter(dictValueCode: string, parentParameterId: number): Promise<ProductParameterForFilter[]> {
    return this.http.get<ProductParameterForFilter[]>('/get-product-parameters-for-filter', {
      dictValueCode,
      parentParameterId
    })
      .toPromise()
      .then(response => response.body);
  }

  getDictList(): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-dict-list')
      .toPromise()
      .then(response => response.body as Dict[]);
  }

  getDictValueList(id: number): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-dict-value-list', { id })
      .toPromise()
      .then(response => response.body);
  }

  getProductTable(filter: TableFilter): Promise<DynamicTable> {
    return this.http.get<DynamicTable>('/get-product-table', { filter })
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  saveProduct(product: Product): Promise<Product> {
    return this.http.postJson<Product>('/save-product', product)
      .toPromise()
      .then(response => response.body as Product);
  }

  saveProductParameterSettings(settings: ProductParameterSettingToSave): Promise<ProductParameterSettingToSave> {
    return this.http.postJson<ProductParameterSettingToSave>('/save-product-parameter-settings', settings)
      .toPromise()
      .then(response => response.body as ProductParameterSettingToSave);
  }

  getProductDetail(id: number): Promise<Product> {
    return this.http.get<Product>('/get-product-detail', { id })
      .toPromise()
      .then(response => response.body as Product);
  }

  getShowAsHeaderCheckBoxes(): Promise<CheckBoxElement> {
    return this.http.get<CheckBoxElement>('/get-showasheader-checkbox')
      .toPromise()
      .then(response => response.body as CheckBoxElement);
  }

  deleteProduct(id: number) {
    this.http.post<number>('/delete-product', { id })
      .toPromise()
      .then(response => response.body as number);
  }

  addProductColumns(checkedElements: CheckBoxElement): Promise<DynamicTable> {
    return this.http.postJson<DynamicTable>('/add-product-columns', checkedElements)
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  getDictTable(filter: TableFilter): Promise<DynamicTable> {
    return this.http.get<DynamicTable>('/get-dict-table', { filter })
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  saveDict(dict: DictToSave): Promise<DictToSave> {
    return this.http.postJson<DictToSave>('/save-dict', dict)
      .toPromise()
      .then(response => response.body as DictToSave);
  }

  getDictDetail(dict: string): Promise<DictToSave> {
    return this.http.get<DictToSave>('/get-dict-detail', { dict })
      .toPromise()
      .then(response => response.body as DictToSave);
  }

  deleteDict(dict: string) {
    this.http.post<string>('/delete-dict', { dict })
      .toPromise()
      .then(response => response.body as string);
  }

  getDictValueTable(filter: TableFilter, dict: string): Promise<DynamicTable> {
    return this.http.get<DynamicTable>('/get-dict-value-table', { filter, dict })
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  saveDictValue(dictValue: DictToSaveValue): Promise<DictToSaveValue> {
    return this.http.postJson<DictToSaveValue>('/save-dict-value', dictValue)
      .toPromise()
      .then(response => response.body as DictToSaveValue);
  }

  getDictValueDetail(id: number): Promise<DictToSaveValue> {
    return this.http.get<DictToSaveValue>('/get-dict-value-detail', { id })
      .toPromise()
      .then(response => response.body as DictToSaveValue);
  }

  deleteDictValue(id: number) {
    this.http.post<number>('/delete-dict-value', { id })
      .toPromise()
      .then(response => response.body as number);
  }

  deleteCheckedInstances(ids: string[], tableName: string): Promise<number> {
    return this.http.post<number>('/delete-checked-instances', { ids: ids, tableName: tableName })
      .toPromise()
      .then(response => response.body as number);
  }

  getFilterTypes(): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-filter-types')
      .toPromise()
      .then(response => response.body as Dict[]);
  }

  getOnCheckSort(tableName: string): Promise<string> {
    return this.http.get<string>('/check-is-sort', { tableName: tableName })
      .toPromise()
      .then(response => response.body);
  }

  copyProduct(id: number) {
    this.http.post<number>('/copy-product', { id })
      .toPromise()
      .then(response => response.body as number);
  }

  saveManager(rolesRecord: RolesRecord) {
    this.http.postJson('/save-manager', rolesRecord)
      .toPromise()
      .then(response => response.body);
  }

  getManagersTable(filter: TableFilter): Promise<DynamicTable> {
    return this.http.get<DynamicTable>('/get-managers-table', { filter })
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  getManagerDetail(id: number): Promise<RolesRecord> {
    return this.http.get<RolesRecord>('/get-manager-detail', { id })
      .toPromise()
      .then(response => response.body as RolesRecord);
  }

  deleteManager(id: string) {
    this.http.post('/delete-manager', { id })
      .toPromise()
      .then(response => response.body);
  }

  saveNews(newsRecord: NewsRecord) {
    return this.http.postJson('/save-news', newsRecord)
      .toPromise()
      .then(response => response.body);
  }

  getNewsTable(filter: TableFilter): Promise<DynamicTable> {
    return this.http.get<DynamicTable>('/get-news-table', { filter })
      .toPromise()
      .then(response => response.body as DynamicTable);
  }

  getNewsDetail(id: number): Promise<NewsRecord> {
    return this.http.get<NewsRecord>('/get-news-detail', { id })
      .toPromise()
      .then(response => response.body as NewsRecord);
  }

  deleteNews(id: string) {
    this.http.post('/delete-news', { id })
      .toPromise()
      .then(response => response.body);
  }

  saveAdditionCredit(additionCredit: AdditionCredit): Promise<string> {
    return this.http.postJson<string>('/save-addition-credit-history', additionCredit)
      .toPromise()
      .then(response => response.body as string);
  }

  deleteCreditHistory(id: number) {
    return this.http.post<number>('/delete-credit-history', { id })
      .toPromise()
      .then(response => response.body as number);
  }
}
