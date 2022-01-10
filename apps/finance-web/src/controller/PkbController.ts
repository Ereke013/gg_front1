import { Injectable } from '@angular/core';
import { HttpService } from '@finance.workspace/http-service';
import { CreditHistory } from '@finance-web/models/CreditHistory';
import { EdsInfo } from '@finance.workspace/shared/model';
import { CodeResponse } from '@finance-web/models/code_response/code-response';

@Injectable({ providedIn: 'root' })
export class PkbController {

  http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('pkb');
  }

  requestPkbByIin(iin: string, productId: number): Promise<CodeResponse> {
    return this.http.get<CodeResponse>('/request-pkb-by-iin', { iin, productId })
      .toPromise()
      .then(res => res.body);
  }

  getCreditHistory(): Promise<CreditHistory[]> {
    return this.http.get<CreditHistory[]>('/get-credit-history')
      .toPromise()
      .then(res => res.body);
  }

  checkId(base64: string): Promise<EdsInfo> {
    return this.http.post<EdsInfo>('/check-id', { base64 })
      .toPromise()
      .then(res => res.body);
  }

  getBase64(): Promise<string> {
    return this.http.get<string>('/get-file-base64')
      .toPromise()
      .then(res => res.body);
  }

  cancelApplication(productId: number) {
    return this.http.post('/cancel-application', { productId })
      .toPromise()
      .then(res => res.body);
  }

  saveBase64(base64: string) {
    return this.http.post('/save-file-base64', { base64 })
      .toPromise()
      .then(res => res.body);
  }
}
