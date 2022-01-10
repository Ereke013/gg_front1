import {Component, Input, ViewEncapsulation} from '@angular/core';
import {ChatNotification, ChatNotificationRow} from '@finance.workspace/shared/model';
import {LibUserNotificationController} from '@finance.workspace/mybpm-kit/controller';
import {Observable} from 'rxjs';
import {UserNotificationService} from '@finance.workspace/mybpm-kit/user-notification';

@Component({
  selector: 'mb-user-notification-block-content',
  templateUrl: './user-notification-chat-block-content.component.html',
  styleUrls: ['./user-notification-chat-block-content.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserNotificationChatBlockContentComponent {

  @Input() header: string;
  @Input() notification: ChatNotification;
  @Input() type: 'message' | 'mention';
  rows: ChatNotificationRow[] = [];

  constructor(
    private readonly libUserNotificationController: LibUserNotificationController,
    private readonly userNotificationService: UserNotificationService,
  ) {}

  toggleRows() {
    if (this.rows.length !== 0) {
      this.rows = [];
      return;
    }
    const controller = this.libUserNotificationController;
    const roomId = this.notification.roomId;

    let rows$: Observable<ChatNotificationRow[]>;

    if (this.type === 'message') {
      rows$ = controller.loadMessageChatNotificationRows(roomId, { offset: 1, limit: 10 });
    } else if (this.type === 'mention') {
      rows$ = controller.loadMentionChatNotificationRows(roomId, { offset: 1, limit: 10 });
    }

    rows$.subscribe(res => this.rows = res);
  }

  deleteMessage() {
    this.libUserNotificationController.deleteMessages(this.notification.roomId, this.notification.lastNotification.happenedAt).subscribe(() => {
      this.notification = undefined;
      this.userNotificationService.emitDelete();
    });
  }

  deleteMessageRow(boiId: string, lastReadAt: Date) {

    if (this.notification.lastNotification.happenedAt === lastReadAt) {
      this.deleteMessage();
    }

    this.libUserNotificationController.deleteMessages(boiId, lastReadAt).subscribe(() => {
      this.rows = this.rows.filter(x => x.happenedAt > lastReadAt);
      this.userNotificationService.emitDelete();
    });
  }

  boiClicked(boiId: string) {
    this.userNotificationService.emitBoiClick(this.notification.boId, boiId);
  }
}
