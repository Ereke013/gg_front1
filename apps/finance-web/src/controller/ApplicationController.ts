import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { TableFilter } from '../models/filter/TableFilter';
import { DynamicTable } from '../models/dynamic_table/DynamicTable';
import { ApplicationCardRequest } from '@finance-web/models/product_card/ApplicationCardRequest';
import { ApplicationRecordToDisplay } from '@finance-web/models/application/ApplicationRecordToDisplay';
import { ApplicationRecord } from '@finance-web/models/application/ApplicationRecord';
import { UserData } from '@finance-web/models/profile/UserData';
import { AdditionalInfoTab } from '@finance-web/models/application/additional-info-tab';
import { Pledge } from '@finance-web/models/pledge/Pledge';
import {CodeResponse} from "@finance-web/models/response/CodeResponse";

@Injectable({ providedIn: 'root' })
export class ApplicationController {

  constructor(private http: HttpService) {
    this.http = http.setControllerPrefix('application');
  }

  getApplications(filter: TableFilter) {
    return this.http.get<DynamicTable>('/get-applications', { filter })
      .toPromise()
      .then(res => res.body as DynamicTable);
  }

  saveApplication(record: ApplicationCardRequest) {
    return this.http.postJson<string>('/save', record)
      .toPromise()
      .then(response => response.body);
  }

  getApplicationTable(): Promise<ApplicationRecordToDisplay[]> {
    return this.http.get<ApplicationRecordToDisplay[]>('/get-applications-table')
      .toPromise()
      .then(response => response.body);
  }

  getApplicationInfo(id: number): Promise<ApplicationRecord> {
    return this.http.get<ApplicationRecord>('/get-application-info', { id })
      .toPromise()
      .then(response => response.body);
  }

  getClientInfo(id: number): Promise<UserData> {
    return this.http.get<UserData>('/get-client-info', { id })
      .toPromise()
      .then(response => response.body);
  }

  getCreditHistoryInfo(id: number): Promise<AdditionalInfoTab> {
    return this.http.get<AdditionalInfoTab>('/get-credit-history-info', { id })
      .toPromise()
      .then(response => response.body);
  }

  getPledgeInfo(id: number): Promise<Pledge[]> {
    return this.http.get<Pledge[]>('/get-pledge-info', { id })
      .toPromise()
      .then(response => response.body);
  }

  getStatus(id: number): Promise<string> {
    return this.http.get<string>('/get-status', { id })
      .toPromise()
      .then(response => response.body);
  }

  changeStatus(id: number, status: string) {
    return this.http.post('/change-status', { id, status })
      .toPromise()
      .then(response => response.body);
  }

  saveApplicationPdf(applicationId: number) {
    return this.http.downloadResource('/application-pdf', { id:applicationId});
  }

  isExists(id: number): Promise<CodeResponse> {
    return this.http.get<CodeResponse>('/check-identify', { id })
      .toPromise()
      .then(response => response.body);
  }

  updateApplicationToSend(record: ApplicationCardRequest) {
    return this.http.postJson('/send-application', record )
      .toPromise()
      .then(response => response.body);
  }

  getClientApplicationInfo(id: number): Promise<ApplicationCardRequest> {
    return this.http.get<ApplicationCardRequest>('/get-client-application-info', { id })
      .toPromise()
      .then(response => response.body);
  }

  getAgreementInfo(): Promise<string> {
    return this.http.get<string>('/get-agreement-info')
      .toPromise()
      .then(response => response.body);
  }

  checkAccessible(id: number):Promise<CodeResponse> {
    return this.http.post<CodeResponse>('/check-accessible', { id })
      .toPromise()
      .then(response => response.body);
  }
}

