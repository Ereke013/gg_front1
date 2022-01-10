import {Injectable} from '@angular/core';
import {HttpService} from '@finance.workspace/http-service';
import {mapBody} from '@finance.workspace/shared/util';
import {CheckInvitationResult, PersonInvitationComplete} from '@finance.workspace/shared/model';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class LibInvitationController {

  private http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/invitation');
  }

  checkPersonInvitation(invitationId: string): Observable<CheckInvitationResult> {
    return mapBody(this.http.post<CheckInvitationResult>('/check-person', { invitationId }));
  }

  personInvitationComplete(personInvitationComplete: PersonInvitationComplete): Observable<void> {
    return mapBody(this.http.post<void>('/complete-person', { personInvitationComplete }));
  }

  sendToPersonPassword(email: string): Observable<void> {
    return mapBody(this.http.post<void>('/send-to-person-password', { email }));
  }

}
