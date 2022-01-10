import {Injectable} from '@angular/core';
import {HttpService} from '@finance.workspace/http-service';
import {BoiDialogType, BusinessObjectDetails} from '@finance.workspace/shared/model';
import {Observable} from 'rxjs/internal/Observable';
import {switchMap} from 'rxjs/operators';
import {mapBody} from '@finance.workspace/shared/util';

@Injectable({ providedIn: 'root' })
export class LibBoController {

  private http: HttpService;

  constructor(
    http: HttpService,
  ) {
    this.http = http.setControllerPrefix('/business-objects');
  }


  loadBoDetailsByCode(boCode: string, viewType: BoiDialogType, boiId?: string): Observable<BusinessObjectDetails> {
    return this.loadBoIdByCode(boCode).pipe(
      switchMap(boId => this.loadBoDetailsById(boId, viewType, boiId)),
    );
  }

  loadBoIdByCode(boCode: string): Observable<string> {
    return mapBody(this.http.post<string>('/load-bo-id-by-code', { boCode }));
  }

  loadBoDetailsById(boId: string, viewType: BoiDialogType, boiId?: string): Observable<BusinessObjectDetails> {
    return mapBody(this.http.post<BusinessObjectDetails>('/load-business-object-details', {
      businessObjectId: boId,
      boInstanceDialogType: viewType,
      boInstanceId: boiId,
    }));
  }

  hasRightsByType(businessObjectId: string, boInstanceId: string, type: BoiDialogType): Observable<boolean> {
    return mapBody(this.http.post<boolean>('/has-rights', {
      businessObjectId,
      boInstanceId,
      type,
    }));
  }

  loadBoSequenceNext(boId: string, fieldId: string): Observable<number> {
    return mapBody(this.http.post<number>('/sequence-next', { boId, fieldId }));
  }

}
