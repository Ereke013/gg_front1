import {Injectable} from '@angular/core';
import {OrgUnitId, OrgUnitRecord} from '@finance.workspace/shared/model';
import {Observable} from 'rxjs';
import {mapBody} from '@finance.workspace/shared/util';
import {HttpService} from '@finance.workspace/http-service';

@Injectable()
export class OrgUnitSelectService {
  private http: HttpService;

  constructor(httpService: HttpService) {
    this.http = httpService.setControllerPrefix('/org-unit');
  }

  loadOrgUnitsByIds(orgUnitIds: OrgUnitId[]): Observable<OrgUnitRecord[]> {
    return mapBody(this.http.post<OrgUnitRecord[]>('/load-org-units-by-ids', { orgUnitIds }));
  }

  loadOrgUnits(filter): Observable<OrgUnitRecord[]> {
    return mapBody(this.http.post<OrgUnitRecord[]>('/load-filtered-org-units', { filter }));
  }

  loadPersons(filter: string): Observable<OrgUnitRecord[]> {
    return mapBody(this.http.post<OrgUnitRecord[]>('/load-filtered-persons', { filter }));
  }

}
