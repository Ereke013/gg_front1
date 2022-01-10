import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LibUserNotificationController} from '@finance.workspace/mybpm-kit/controller';
import {Observable, pipe, Subject, UnaryFunction} from 'rxjs';
import {
  ChatNotification,
  Paging,
  UserNotification,
  UserNotificationCount,
  UserNotificationType,
} from '@finance.workspace/shared/model';
import {UserNotificationService} from './_services/UserNotificationService';
import {map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'mb-user-notification',
  templateUrl: './user-notification.component.html',
  styleUrls: ['./user-notification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserNotificationComponent implements OnInit {
  private readonly paging$ = new Subject<Paging>();
  messageNotifications$: Observable<ChatNotification[]>;
  mentionNotifications$: Observable<ChatNotification[]>;
  count: UserNotificationCount;

  constructor(
    private readonly libUserNotificationController: LibUserNotificationController,
    private readonly userNotificationService: UserNotificationService,
  ) {}

  ngOnInit(): void {

    const paging$ = this.paging$.asObservable().pipe(startWith({ offset: 0, limit: 100 }));

    this.messageNotifications$ = paging$.pipe(
      switchMap(x => this.libUserNotificationController.loadMessageChatNotifications(x)),
      this.handleUpdate(UserNotificationType.NEW_MESSAGE),
    );

    this.mentionNotifications$ = paging$.pipe(
      switchMap(x => this.libUserNotificationController.loadMentionChatNotifications(x)),
      this.handleUpdate(UserNotificationType.NEW_MENTION),
    );

    this.userNotificationService.count$().subscribe(res => this.count = res);

  }

  handleUpdate(type: UserNotificationType): UnaryFunction<Observable<ChatNotification[]>, Observable<ChatNotification[]>> {
    return pipe(
      switchMap(notifications => this.userNotificationService.onUpdate().pipe(
        startWith<UserNotification, UserNotification>(undefined),
        map(update => ({ notifications, update }))),
      ),
      map(({ notifications, update }) => {

        if (!update) { return notifications; }

        if (update.type === type) {
          notifications = notifications.filter(x => x.roomId !== update.chatNotification.roomId);
          notifications.unshift(update.chatNotification);
          return notifications;
        }

        return notifications;
      }),
    );
  }

  deleteAll() {
    this.libUserNotificationController.deleteAllMessages().subscribe(() => {
      this.paging$.next({ offset: 0, limit: 100 });
      this.userNotificationService.emitDelete();
    });
  }
}
