import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TabChatService} from './tab-chat.service';
import {FileMetaInfo, Message} from '@finance.workspace/shared/model';
import {FileUtilService} from '@finance.workspace/file-util';

@Component({
  selector: 'app-tab-chat-input-reply',
  templateUrl: './tab-chat-input-reply.component.html',
  styleUrls: ['./tab-chat-input-reply.component.scss'],
})
export class TabChatInputReplyComponent {

  //region message
  _message: Message;

  get message(): Message {
    return this._message;
  }

  @Input()
  set message(message: Message) {
    this._message = message;
    if (!message) {
      return;
    }
    this.currentColor = this.service.colorPaletteByUserId(message.userId);
    this.getFileInfo(message.imageFileId);
    this.focusOnInputSpan.emit();
  }

  //endregion

  @Input() userId: string;
  @Output() messageChange: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() focusOnInputSpan = new EventEmitter<void>();

  currentColor: string;
  fileInfo: FileMetaInfo;

  constructor(
    public readonly service: TabChatService,
    public readonly fileService: FileUtilService,
  ) {}

  closeMe(event: Event) {
    event.stopPropagation();
    this.message = undefined;
    this.messageChange.emit(this.message);
  }

  private getFileInfo(imageFileId: string) {
    if (!imageFileId) { return; }
    this.fileService.loadFileMetaInfo(imageFileId).toPromise().then(info => this.fileInfo = info);
  }
}
