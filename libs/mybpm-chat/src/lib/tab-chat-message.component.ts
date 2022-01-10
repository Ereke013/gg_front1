import {Component, EventEmitter, Input, OnInit, Output, ViewContainerRef} from '@angular/core';
import {FileMetaInfo, Message} from '@finance.workspace/shared/model';
import {FileUtilService} from '@finance.workspace/file-util';

@Component({
  selector: 'app-tab-chat-message',
  templateUrl: './tab-chat-message.component.html',
  styleUrls: ['./tab-chat-message.component.scss'],
})
export class TabChatMessageComponent implements OnInit {

  @Input() userId: string;
  @Input() message: Message;
  @Output() reply = new EventEmitter<void>();
  @Output() focusOnMessageByMessageId = new EventEmitter<string>();
  fileInfo: FileMetaInfo;
  fadeInFadeOut: boolean;

  constructor(
    private readonly fileController: FileUtilService,
    private readonly vcRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.getFileInfo(this.message.imageFileId);
  }

  openMessageExpand() {
    this.reply.emit();
  }

  getMessageType(message: Message) {
    return message.userId === this.userId ? 'sent' : 'received';
  }

  private getFileInfo(imageFileId: string) {
    if (!imageFileId) {
      return;
    }
    this.fileController.loadFileMetaInfo(imageFileId).toPromise().then((info) => this.fileInfo = info);
  }

  focusOnSelf() {
    if (this.fadeInFadeOut) {
      return;
    }
    this.vcRef.element.nativeElement.tabIndex = 1;
    this.vcRef.element.nativeElement.focus();
    this.vcRef.element.nativeElement.tabIndex = -1;
    this.fadeInAndFadeOut();
  }

  fadeInAndFadeOut() {
    this.fadeInFadeOut = true;
    setTimeout(() => this.fadeInFadeOut = false, 1000);
  }

  urlify(text: string) {
    const linkRegExpHttps = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    return text.replace(linkRegExpHttps, url => {
      return '<a href="' + url + '" target="_blank">' + url + '</a>';
    });
  }

}
