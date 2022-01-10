import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {Subject} from 'rxjs';
import {
  FileMetaInfo,
  Message,
  OrgUnitId,
  OrgUnitRecord,
  OrgUnitRecordF,
  WritingUser,
} from '@finance.workspace/shared/model';
import {TabChatService} from './tab-chat.service';
import {ScrollDispatcher} from '@angular/cdk/overlay';
import {SubSink} from '@finance.workspace/shared/util';
import {debounceTime, tap} from 'rxjs/operators';
import {Popover, PopoverRef, Position} from '@finance.workspace/popover';
import {TabChatMessageComponent} from './tab-chat-message.component';
import {TabChatInputComponent} from './tab-chat-input.component';

@Component({
  selector: 'app-tab-chat',
  templateUrl: './tab-chat.component.html',
  styleUrls: ['./tab-chat.component.scss'],
})
export class TabChatComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('addPersonIcon') addPersonIcon: ElementRef;
  @ViewChild('scroller') scroller: ElementRef;
  @ViewChild('orgUnitSelect') orgUnitSelect: TemplateRef<any>;
  @ViewChildren(TabChatMessageComponent) tabChatMessages: QueryList<TabChatMessageComponent>;
  @ViewChild(TabChatInputComponent) tabChatInputComponent: TabChatInputComponent;
  @Input() inputValue: string;
  @Input() userId: string;
  @Input() roomId: string;
  @Input() roomType: string;
  @Input() focusMessageId: string;
  @Input() members: OrgUnitRecord[];
  @Output() addMember = new EventEmitter<OrgUnitRecord[]>();
  @Output() deleteMember = new EventEmitter<OrgUnitId[]>();
  @Output() destroy = new EventEmitter<string>();
  @Output() valueChanged = new EventEmitter<string>();
  messages: Message[] = [];
  appealMembers: OrgUnitId[] = [];
  writingUsers: WritingUser[];
  replyMessage: Message;
  attachment: FileMetaInfo;
  inputValueChanged = new Subject();
  popoverRef: PopoverRef;
  toAddOrgUnitList: OrgUnitRecord[] = [];
  toDelOrgUnitList: OrgUnitId[] = [];

  private readonly unsub = new SubSink();
  private isOnBottomOfChat: boolean;

  constructor(
    private readonly service: TabChatService,
    private readonly cdr: ChangeDetectorRef,
    private readonly scrollDispatcher: ScrollDispatcher,
    private readonly popover: Popover,
  ) {}

  ngOnInit() {
    this.service.initApp(this.userId, this.roomId, this.roomType);
  }

  ngAfterViewInit() {
    this.scrollDispatcher.scrolled(300).pipe().subscribe(() => this.computeScrollAndLoadPage());
    this.unsub.sink = this.service.messages$.subscribe(messages => {
      this.messages = messages;
      if (this.hasScrollBar()) {
        return;
      }
      if (!this.service.nextPageId) {
        this.service.readMessage(messages[0].id);
      }
      this.service.loadNextPage();
    });
    this.unsub.sink = this.service.writingUsers$.subscribe(users => {
      this.writingUsers = users;
    });
    this.inputValueChanged.asObservable().pipe(
      tap(() => this.service.setUserEditing(true)),
      debounceTime(1000),
      tap(() => this.service.setUserEditing(false)),
    ).subscribe();

    if (this.focusMessageId) {
      this.focusOnMessageByMessageId(this.focusMessageId);
    }
  }

  ngOnDestroy() {
    this.service.setUserEditing(false);
    this.service.clearState();
    this.unsub.unsubscribe();
    this.popoverRef?.close();

    this.destroy.emit();
  }

  private hasScrollBar() {
    return this.scroller && this.scroller.nativeElement.scrollHeight > this.scroller.nativeElement.clientHeight;
  }

  get nextPageId() {
    return this.service.nextPageId;
  }

  get lastReadMessageId() {
    return this.service.lastUnreadMessageId;
  }

  get unreadCount() {
    return this.service.unreadCount;
  }

  colorPaletteByUserId(message: Message) {
    return this.service.colorPaletteByUserId(message.userId);
  }

  private computeScrollAndLoadPage() {
    if (!this.scroller) {
      return;
    }
    if (this.scroller.nativeElement.scrollHeight < 100) {
      return;
    }
    const scrollTop = this.scroller.nativeElement.scrollTop * -1;
    const scrollHeight = this.scroller.nativeElement.scrollHeight;
    const offsetHeight = this.scroller.nativeElement.offsetHeight;
    const sizeToTop = scrollHeight - (scrollTop + offsetHeight);

    this.chatScrolled();

    if (sizeToTop < 100) {
      this.chatScrolledToTop();
    }

    if (scrollTop <= 0) {
      this.chatScrolledToBottom();
    }
  }

  private chatScrolled() {
    this.isOnBottomOfChat = false;
  }

  private chatScrolledToTop() {
    this.service.loadNextPage();
  }

  private chatScrolledToBottom() {
    this.isOnBottomOfChat = true;
    if (this.lastReadMessageId) {
      this.service.readMessage(this.messages[0].id);
    }
  }

  sendMessage(text: string) {
    let replyMessageId = null;
    let imageFileId = null;

    if (this.replyMessage) {
      replyMessageId = this.replyMessage.id;
    }

    if (this.attachment) {
      imageFileId = this.attachment.fileId;
    }

    if (text) {
      text = text.trim();
    }

    if (!text) {
      text = '';
    }

    if (!text && !imageFileId && !replyMessageId) {
      return;
    }

    this.service.sendMessage(text, replyMessageId, imageFileId, this.appealMembers.map(m => m.id));
    this.appealMembers = [];
    this.replyMessage = null;
    this.attachment = null;

    this.scrollToBottomSmooth();
  }

  scrollToBottomSmooth() {
    setTimeout(() => {
      const scrollTop = this.scroller.nativeElement.scrollTop * -1;
      const scrollHeight = this.scroller.nativeElement.scrollHeight;
      const offsetHeight = this.scroller.nativeElement.offsetHeight;
      const sizeToTop = scrollHeight - (scrollTop + offsetHeight);

      this.scroller.nativeElement.scrollTo({ top: sizeToTop, behavior: 'smooth' });
    }, 500);
  }

  getId(index: number, message: Message) {
    return message.id;
  }

  openAddRecordPopover() {
    const origin = this.addPersonIcon.nativeElement;
    const content = this.orgUnitSelect;
    const position = Position.bottom;
    const hasBackdrop = true;
    this.popoverRef = this.popover.open({
      origin,
      content,
      hasBackdrop,
      position,
    });
    this.popoverRef.afterClosed.subscribe(() => {
      this.popoverRef = null;
      this.addParticipants();
    });
  }

  closePopover() {
    if (this.popoverRef) {
      this.popoverRef.close();
    }
  }

  addAppealMember(record: OrgUnitRecord): void {
    this.appealMembers.push(OrgUnitRecordF.toOrgUnitId(record));
    this.addMemberToList(record);
  }

  delAppealMember(record: OrgUnitRecord): void {
    this.appealMembers = this.appealMembers.filter(x => x.id !== record.id);
    this.delMemberToList(record);
  }

  addMemberToList(record: OrgUnitRecord): void {
    this.unselectOrgUnit(record.id);
    this.toAddOrgUnitList.push(record);
  }

  delMemberToList(record: OrgUnitRecord): void {
    const orgUnitId = OrgUnitRecordF.toOrgUnitId(record);
    this.unselectOrgUnit(record.id);
    this.toDelOrgUnitList.push(orgUnitId);
  }

  focusOnMessageByMessageId(messageId: string) {
    const message = this.tabChatMessages.find(m => m.message.id === messageId);
    if (message) {
      setTimeout(() => message.focusOnSelf(), 0);
    } else {
      this.service.loadNextPage();
      setTimeout(() => this.focusOnMessageByMessageId(messageId), 0);
    }
  }

  unselectOrgUnit(id: string) {
    this.toAddOrgUnitList = this.toAddOrgUnitList.filter(x => x.id !== id);
    this.toDelOrgUnitList = this.toDelOrgUnitList.filter(x => x.id !== id);
  }

  focusOnInputSpan() {
    this.tabChatInputComponent.focusOnInputSpan();
  }

  addParticipants() {
    if (this.toAddOrgUnitList.length) {
      this.addMember.emit(this.toAddOrgUnitList);
      this.toAddOrgUnitList = [];
    }

    if (this.toDelOrgUnitList.length) {
      this.deleteMember.emit(this.toDelOrgUnitList);
      this.toDelOrgUnitList = [];
    }
  }

  sendMessageToChat(messageText: string) {
    this.addParticipants();
    this.sendMessage(messageText);
    this.valueChanged.emit(undefined);
  }
}
