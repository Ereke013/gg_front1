import {Injectable} from '@angular/core';
import {HttpService} from '@finance.workspace/http-service';
import {Observable} from 'rxjs';
import {mapBody, requireNonNull} from '@finance.workspace/shared/util';
import {ApiBoiTableReq} from './model/ApiBoiTableReq';
import {ApiBoiTableRes} from './model/ApiBoiTableRes';
import {
  BoAutocompleteOption,
  BoAutocompleteOptionsRequest,
  BoiFieldValueToSave,
  BoInstance,
  BoiSelectorFilter,
  BoiSelectorRecord,
  BoiSelectorRequest,
  BoiValueToSave,
  LoadBoiRequest,
  TabAttachmentRecord,
} from '@finance.workspace/shared/model';
import {mapTo, switchMap} from 'rxjs/operators';
import {ApiBoiRes} from './model/ApiBoiRes';
import {ApiBoiReq} from './model/ApiBoiReq';

@Injectable({ providedIn: 'root' })
export class LibBoiController {
  private http: HttpService;
  private apiHttp: HttpService;

  constructor(
    httpService: HttpService,
  ) {
    this.http = httpService.setControllerPrefix('/business-object-instance');
    this.apiHttp = httpService.setControllerPrefix('/api/v1/business-object-instance');
  }

  loadApiBoiTable(apiBoiTableReq: ApiBoiTableReq): Observable<ApiBoiTableRes> {
    apiBoiTableReq.paging = apiBoiTableReq.paging ?? { limit: 10, offset: 0 };
    return mapBody(this.apiHttp.get<ApiBoiTableRes>('/load-api-dynamic_table-table', { apiBoiTableReq }));
  }

  loadApiBoi({ boCode, boiId }: ApiBoiReq): Observable<ApiBoiRes> {
    requireNonNull(boCode, 'DXyFp9h2');
    requireNonNull(boiId, 'lcYmGq8o');
    return mapBody(this.apiHttp.get<ApiBoiRes>(`/${boCode}/id:${boiId}`));
  }

  loadBoi(boId: string, boiId: string, draftId?: string): Observable<BoInstance> {
    const request: LoadBoiRequest = {
      businessObjectId: boId, boInstanceId: boiId, draftId,
    };
    return mapBody(this.http.post<BoInstance>('/load-bo-instance', { request }));
  }

  isFieldValueUnique(boId: string, boiId: string, fieldId: string, value: string): Observable<boolean> {
    return mapBody(this.http.post('/is-field-value-unique', {
      boId,
      boiId,
      fieldId,
      value,
    }));
  }

  saveBoiImmediately(boId: string, boInstanceId: string, values: BoiFieldValueToSave[]): Observable<void> {
    requireNonNull(boId, 'donjEfKL ');
    requireNonNull(boInstanceId, 'tkNxNLEq');
    if (!values || values.length === 0) {
      return;
    }

    return this.createDraft().pipe(
      switchMap(draftId => {
        const toSave = BoiValueToSave.of(draftId, boId, boInstanceId);
        for (const { fieldId, value } of values) {
          toSave.addValue(fieldId, value);
        }
        return this.saveBoiValue(toSave).pipe(mapTo(draftId));
      }),
      switchMap(draftId => this.applyAndRemoveDraft(draftId)),
    );
  }

  createDraft(): Observable<string> {
    return mapBody(this.http.post<string>('/create-draft'));
  }

  createBoi(draftId: string, boId: string): Observable<string> {
    return mapBody(this.http.post<string>('/v2/create-dynamic_table', { draftId, boId }));
  }

  saveBoiValue(toSave: BoiValueToSave): Observable<void> {
    return mapBody(this.http.post<void>('/v2/save-dynamic_table-value', { toSave }));
  }

  applyAndRemoveDraft(draftId: string): Observable<void> {
    return mapBody(this.http.post<void>('/apply-and-remove-draft', { draftId }));
  }

  removeDraft(draftId: string): Observable<void> {
    return mapBody(this.http.post<void>('/remove-draft', { draftId }));
  }

  loadBoiSelectorRecordsByIds(request: BoiSelectorRequest): Observable<BoiSelectorRecord[]> {
    return mapBody(this.http.post<BoiSelectorRecord[]>('/load-bo-instance-selector-records-by-ids', { request }));
  }

  loadBoiSelectorRecords(filter: BoiSelectorFilter): Observable<BoiSelectorRecord[]> {
    return mapBody(this.http.post<BoiSelectorRecord[]>('/load-bo-instance-selector-records', { filter }));
  }

  loadBoInstanceAttachments(businessObjectId: string, boInstanceId: string, draftId: string): Observable<TabAttachmentRecord[]> {
    return mapBody(this.http.post<TabAttachmentRecord[]>('/load-bo-instance-attachments', {
      businessObjectId,
      boInstanceId,
      draftId,
    }));
  }

  loadBoAutocompleteOptions(request: BoAutocompleteOptionsRequest): Observable<BoAutocompleteOption[]> {
    return mapBody(this.http.post('/load-bo-auto-complete-options', { request }));
  }

}
