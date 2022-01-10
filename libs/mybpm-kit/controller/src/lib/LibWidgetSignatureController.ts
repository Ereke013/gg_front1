import {Injectable} from '@angular/core';
import {HttpService} from '@finance.workspace/http-service';
import {Eds, FilledSignatureGroup, SignatureInfo, SignatureRecord} from '@finance.workspace/shared/model';
import {Observable} from 'rxjs/internal/Observable';
import {mapBody} from '@finance.workspace/shared/util';

@Injectable({ providedIn: 'root' })
export class LibWidgetSignatureController {
  private http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/signature');
  }

  loadFilledSignatureGroup(boId: string, boiId: string, signatureId: string): Observable<FilledSignatureGroup> {
    return mapBody(this.http.post<FilledSignatureGroup>('/load-filled-signature-group', { boId, boiId, signatureId }));
  }

  generateCode(signatureId: string, boId: string, boiId: string, phone: string): Observable<void> {
    return mapBody(this.http.post<void>('/generate-code', { signatureId, boId, boiId, phone }));
  }

  signByCode(boId: string, boiId: string, code: string): Observable<boolean> {
    return mapBody(this.http.post<boolean>('/sign-by-code', { boId, boiId, code }));
  }

  loadDataForSignatureInBase64(boId: string, boiId: string, signatureId: string): Observable<Eds> {
    return mapBody(this.http.post<Eds>('/load-data-for-signature-in-base64', { boId, boiId, signatureId }));
  }

  saveSignedData(eds: Eds): Observable<boolean> {
    return mapBody(this.http.post<boolean>('/save-signed-data', { eds }));
  }

  loadSignaturesList(boBoiId: string): Observable<SignatureRecord[]> {
    return mapBody(this.http.post<SignatureRecord[]>('/load-signatures-list', { boBoiId }));
  }

  downloadCmsData(boBoiId: string, signId: string) {
    this.http.downloadResource('/download-cms-data', { boBoiId, signId }).then();
  }

  loadSignatureInfo(boBoiId: string, signId: string): Observable<SignatureInfo> {
    return mapBody(this.http.post<SignatureInfo>('/load-signature-info', { boBoiId, signId }));
  }

}
