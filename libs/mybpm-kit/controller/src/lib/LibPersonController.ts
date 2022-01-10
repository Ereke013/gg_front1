import {Injectable} from '@angular/core';
import {HttpService} from '@finance.workspace/http-service';
import {mapBody} from '@finance.workspace/shared/util';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })
export class LibPersonController {
  private http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/person');
  }

  updatePassword(personId: string, oldPassword: string, newPassword: string): Observable<void> {
    return mapBody(this.http.post<void>('/update-password', { personId, oldPassword, newPassword }));
  }

  updateAvatarId(personId: string, avatarId: string): Observable<void> {
    return mapBody(this.http.post<void>('/update-avatar-id', { personId, avatarId }));
  }

}
