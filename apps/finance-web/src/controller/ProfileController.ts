import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { AllFilters } from '@finance-web/models/all-filters/AllFilters';
import { UserData } from '@finance-web/models/profile/UserData';
import { PledgeListToSave } from '@finance-web/models/pledge/PledgeListToSave';
import { Pledge } from '@finance-web/models/pledge/Pledge';
import { UserChangePassword } from '@finance-web/models/profile/UserChangePassword';
import { FileInfo } from '@finance-web/models/file/FileInfo';
import {ApplicationSave} from "@finance-web/models/application/ApplicationSave";

@Injectable({ providedIn: 'root' })
export class ProfileController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('profile');
  }


  getCollateral(): Promise<AllFilters> {
    return this.http.get<AllFilters>('/get-collateral')
      .toPromise()
      .then(response => response.body);
  }

  getPledgeType(filterType: string): Promise<AllFilters[]> {
    return this.http.get<AllFilters[]>('/get-pledge-type', { filterType })
      .toPromise()
      .then(response => response.body);
  }

  getUserData(): Promise<UserData> {
    return this.http.get<UserData>('/get-user-data')
      .toPromise()
      .then(response => response.body);
  }

  savePledges(pledges: PledgeListToSave[]): Promise<PledgeListToSave[]> {
    return this.http.postJson<PledgeListToSave[]>('/save-pledges', pledges)
      .toPromise()
      .then(response => response.body);
  }

  getPledges(): Promise<Pledge[]> {
    return this.http.get<Pledge[]>('/get-pledges')
      .toPromise()
      .then(response => response.body);
  }

  deletePledge(id: number): Promise<void> {
    return this.http.post<void>('/delete-pledge', { id: id })
      .toPromise()
      .then(response => response.body);
  }

  changePassword(userChangePassword: UserChangePassword): Promise<string> {
    return this.http.postJson<string>('/change-password', userChangePassword)
      .toPromise()
      .then(response => response.body);
  }

  getLastSavedPledge(): Promise<Pledge> {
    return this.http.get<Pledge>('/get-pledge-last')
      .toPromise()
      .then(response => response.body);
  }

  saveDocument(fileId: string) {
    return this.http.post('/save-document', { fileId })
      .toPromise()
      .then(response => response.body);
  }

  getDocuments(): Promise<FileInfo[]> {
    return this.http.get<FileInfo[]>('/get-documents')
      .toPromise()
      .then(response => response.body);
  }

  deleteDocument(fileId: string) {
    return this.http.post('/delete-document', { fileId })
      .toPromise()
      .then(response => response.body);
  }

  saveApplicationPledge(applicationSave: ApplicationSave) {
    return this.http.postJson('/save-application-pledge', applicationSave)
      .toPromise()
      .then(response => response.body);
  }

  saveApplicationDoc(applicationSave: ApplicationSave) {
    return this.http.postJson('/save-application-doc', applicationSave)
      .toPromise()
      .then(response => response.body);
  }
}
