import {Injectable} from '@angular/core';
import {WsController, WsService} from '@finance.workspace/ws-service';
import {UserNotification, UserNotificationCount} from '@finance.workspace/shared/model';
import {merge, Observable, Subject} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {LibUserNotificationController} from '@finance.workspace/mybpm-kit/controller';

@Injectable({ providedIn: 'root' })
export class UserNotificationService {
  private readonly boiClickSubject = new Subject<{ boId: string, boiId: string; }>();
  private wsController: WsController;
  private anyDelete = new Subject<void>();

  readonly boiClick$ = this.boiClickSubject.asObservable();

  constructor(
    wsService: WsService,
    private readonly libUserNotificationController: LibUserNotificationController) {
    this.wsController = wsService.cd('user-notification');
  }

  watch() {
    this.wsController.send('watch-user-notification');
  }

  unwatch() {
    this.wsController.send('unwatch-user-notification');
  }

  onUpdate(): Observable<UserNotification> {
    return this.wsController.on<UserNotification>('notifications');
  }

  count$(): Observable<UserNotificationCount> {
    return merge(this.onUpdate(), this.anyDelete.asObservable()).pipe(
      startWith({}),
      switchMap(() => this.libUserNotificationController.loadCount()),
    );
  }

  emitDelete(): void {
    this.anyDelete.next();
  }

  emitBoiClick(boId: string, boiId: string): void {
    this.boiClickSubject.next({ boId, boiId });
  }
}
