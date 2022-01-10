import {Injectable} from '@angular/core';
import {WsController, WsService} from '@finance.workspace/ws-service';
import {merge, Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {SubSink} from '@finance.workspace/shared/util';
import {Message, MessagePage, WritingUser} from '@finance.workspace/shared/model';

@Injectable()
export class TabChatService {
  private readonly unsub = new SubSink();
  private messages: Message[] = [];

  public messages$: Observable<Message[]>;
  public newMessage$: Observable<Message>;
  public writingUsers$: Observable<WritingUser[]>;

  serviceMessage: WsController;
  serviceReply: WsController;

  userId: string;
  roomId: string;
  roomType: string;
  nextPageId: string;
  unreadCount = -1;
  lastUnreadMessageId: string;

  colorPaletteMap: Map<string, string> = new Map<string, string>();
  presetColors: string[] = [
    'hsl(275,100%,25%)', 'hsl(240,100%,25%)', 'hsl(291,64%,42%)', 'hsl(262,52%,47%)', 'hsl(231,48%,48%)', 'hsl(200,18%,46%)',
    'hsl(180,75%,13%)', 'hsl(207,90%,54%)', 'hsl(199,98%,48%)', 'hsl(187,100%,38%)', 'hsl(174,100%,29%)', 'hsl(88,50%,53%)',
    'hsl(16,25%,38%)', 'hsl(0,65%,51%)', 'hsl(14,82%,46%)', 'hsl(27,100%,47%)', 'hsl(340,82%,52%)', 'hsl(323,68%,61%)',
  ];
  private isUserWriting: boolean;

  constructor(
    wsService: WsService,
  ) {
    this.serviceMessage = wsService.cd('chat/message-list');
    this.serviceReply = wsService.cd('chat/reply-message');
  }

  clearState(): void {
    this.serviceMessage.send('unwatch-room', { roomId: this.roomId });
    this.roomId = undefined;
    this.roomType = undefined;
    this.unsub.unsubscribe();
  }

  initApp(userId: string, roomId: string, roomType: string) {

    if (!userId || !roomId || !roomType) {
      throw new Error('User id, room id or room type can not be empty');
    }

    this.userId = userId;
    this.roomId = roomId;
    this.roomType = roomType;
    this.initRoom();
    this.initMessages();
    this.unsub.sink = this.serviceMessage.onConnectionReopen().subscribe(() => {
      if (!this.roomId) return;
      this.serviceMessage.send('watch-room', { roomId: this.roomId });
    });

  }

  private initRoom() {
    const self = this;
    self.serviceMessage.send('load-page', { roomId: self.roomId, pageId: null });
    self.serviceMessage.send('load-writing-users', { roomId: self.roomId });
    self.serviceMessage.send('watch-room', { roomId: self.roomId });
  }

  private initMessages() {

    const self = this;
    this.messages = [];

    const page$ = this.serviceMessage.on<MessagePage>('page').pipe(
      filter(page => page.list.length > 0),
      tap(page => this.messages.push(...page.list)),
      tap(page => this.nextPageId = page.nextPageId),
      tap(page => calculateLastReadMessageId(page)),
      map(() => this.messages),
    );

    function calculateLastReadMessageId(page: MessagePage) {
      if (self.lastUnreadMessageId) {
        return;
      }
      const lastReadDate = page.lastReadDate;

      for (let i = 0; i < page.list.length; i++) {
        self.unreadCount++;
        const message = page.list[i];
        if (message.createdAt < lastReadDate) {
          self.lastUnreadMessageId = page.list[i - 1]?.id;
          return;
        }
      }

      self.loadNextPage();

    }

    this.newMessage$ = this.serviceMessage.on<Message>('new-message');

    const newMessage$ = this.newMessage$.pipe(
      tap(message => this.messages.unshift(message)),
      tap(message => this.readMessage(message.id)),
      map(() => this.messages),
    );

    this.messages$ = merge(page$, newMessage$);

    this.writingUsers$ = this.serviceMessage.on<WritingUser[]>('set-writing-text-users').pipe(
      map(list => list.filter(wu => wu.userId !== this.userId)),
    );

  }

  sendAndListenReplyMessage(replyMessageId: string): Observable<Message> {
    this.serviceReply.send('load-message-by-id', { messageId: replyMessageId });
    return this.serviceReply.on<Message>('message');
  }

  setRoom(roomId: string) {
    if (this.roomId || this.roomId === roomId) {
      return;
    }
    this.roomId = roomId;
  }

  readMessage(messageId: string) {
    this.serviceMessage.send('user-read-message', { messageId });
  }

  generateColor(userId: string) {
    if (userId === this.userId) {
      return 'hsl(210, 50%, 50%)';
    }
    return this.presetColors[Math.floor(Math.random() * 18)].toString();
  }

  colorPaletteByUserId(userId?: string) {
    userId = userId ? userId : this.userId;
    return this.computeUserColor(userId);
  }

  private computeUserColor(userId: string) {
    const color = this.colorPaletteMap.get(userId);

    if (color) {
      return color;
    }

    const generated = this.generateColor(userId);
    this.colorPaletteMap.set(userId, generated);

    return generated;

  }

  loadNextPage() {
    if (!this.nextPageId) {
      return;
    }
    this.serviceMessage.send('load-page', {
      pageId: this.nextPageId,
      roomId: this.roomId,
    });
  }

  setUserEditing(editing: boolean): void {
    if (this.isUserWriting === editing) {
      return;
    }
    const path = editing ? 'user-started-edit-text' : 'user-stopped-edit-text';
    this.serviceMessage.send(path, { roomId: this.roomId });
    this.isUserWriting = editing;
  }

  sendMessage(text: string, replyMessageId: string, imageFileId: string, appealToUserIds: string[]) {
    this.serviceMessage.send('send-message', {
      roomId: this.roomId,
      text,
      replyMessageId,
      imageFileId,
      appealToUserIds: appealToUserIds,
    });
  }

}
