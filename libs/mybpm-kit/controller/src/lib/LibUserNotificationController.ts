import {Injectable} from '@angular/core';
import {HttpService} from '@finance.workspace/http-service';
import {Observable} from 'rxjs/internal/Observable';
import {mapBody} from '@finance.workspace/shared/util';
import {ChatNotification, ChatNotificationRow, Paging, UserNotificationCount} from '@finance.workspace/shared/model';

@Injectable({ providedIn: 'root' })
export class LibUserNotificationController {
  private http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('/user-notification');
  }

  loadCount(): Observable<UserNotificationCount> {
    return mapBody(this.http.post<UserNotificationCount>('/count'));
  }

  loadMessageChatNotifications(paging: Paging): Observable<ChatNotification[]> {
    return mapBody(this.http.post<ChatNotification[]>('/load-message-chat-notifications', { paging }));
  }

  loadMentionChatNotifications(paging: Paging): Observable<ChatNotification[]> {
    return mapBody(this.http.post<ChatNotification[]>('/load-mention-chat-notifications', { paging }));
  }

  loadMessageChatNotificationRows(roomId: string, paging: Paging): Observable<ChatNotificationRow[]> {
    return mapBody(this.http.post<ChatNotificationRow[]>('/load-message-chat-notification-rows', { roomId, paging }));
  }

  loadMentionChatNotificationRows(roomId: string, paging: Paging): Observable<ChatNotificationRow[]> {
    return mapBody(this.http.post<ChatNotificationRow[]>('/load-mention-chat-notification-rows', { roomId, paging }));
  }

  deleteAllMessages(): Observable<void> {
    return mapBody(this.http.post<void>('/delete-all-messages'));
  }

  deleteMessages(boiId: string, lastReadAt: Date): Observable<void> {
    return mapBody(this.http.post<void>('/delete-messages', { boiId, lastReadAt }));
  }

}
