import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { TableFilter } from '../models/filter/TableFilter';
import { DynamicTable } from '../models/dynamic_table/DynamicTable';
import { BankProductToSave } from '@finance-web/models/bank_product/BankProductToSave';
import { FileInfo } from '@finance-web/models/file/FileInfo';
import { Dict } from '@finance-web/models/dict/Dict';
import { BankProductToShow } from '@finance-web/models/bank_product/BankProductToShow';

@Injectable({ providedIn: 'root' })
export class BankContactController {

  constructor(private http: HttpService) {
    this.http = http.setControllerPrefix('bank-contact');
  }

  getTable(filter: TableFilter) {
    return this.http.get<DynamicTable>('/get-table', { filter })
      .toPromise()
      .then(res => res.body as DynamicTable);
  }

  save(toSave: BankProductToSave) {
    return this.http.postJson('/save', toSave)
      .toPromise()
      .then(res => res.body);
  }

  saveFileId(fileInfo: FileInfo): Promise<string> {
    return this.http.postJson('/save-file-id', fileInfo)
      .toPromise()
      .then(res => res.body as string);
  }

  getBankContactDetail(id: string): Promise<BankProductToSave> {
    return this.http.get<BankProductToSave>('/get-bank-contact-detail', { id })
      .toPromise()
      .then(response => response.body as BankProductToSave);
  }

  deleteBankContact(id: string) {
    this.http.post<number>('/delete-bank-contact', { id })
      .toPromise()
      .then(response => response.body as number);
  }

  deleteCheckedInstances(ids: string[]): Promise<number> {
    return this.http.post<number>('/delete-checked-instances', { ids })
      .toPromise()
      .then(response => response.body as number);
  }

  getFinancialOrganizations(): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-financial-organizations')
      .toPromise()
      .then(response => response.body as Dict[]);
  }

  getCities(): Promise<Dict[]> {
    return this.http.get<Dict[]>('/get-cities')
      .toPromise()
      .then(response => response.body as Dict[]);
  }

  deleteBranch(id: number) {
    return this.http.post('/delete-branch', { id })
      .toPromise()
      .then(response => response.body);
  }

  deleteBankIcon(id: string) {
    return this.http.post('/delete-bank-icon', { id })
      .toPromise()
      .then(response => response.body);
  }
}

