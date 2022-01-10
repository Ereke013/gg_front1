import {Component, Input, OnDestroy} from '@angular/core';
import {TabChatService} from './tab-chat.service';
import {filter} from 'rxjs/operators';
import {FileMetaInfo, Message} from '@finance.workspace/shared/model';
import {SubSink} from '@finance.workspace/shared/util';
import {FileUtilService} from '@finance.workspace/file-util';

@Component({
  selector: 'app-tab-chat-replied-message',
  templateUrl: './tab-chat-replied-message.component.html',
  styleUrls: ['./tab-chat-replied-message.component.scss'],
})
export class TabChatRepliedMessageComponent implements OnDestroy {
  message: Message;
  currentColor: string;
  fileInfo: FileMetaInfo;

  @Input()
  set replyMessageId(value: string) {
    if (!value) {
      return;
    }

    this.subs.sink = this.service.sendAndListenReplyMessage(value).pipe(
      filter(message => value === message.id),
    ).subscribe(message => {
      this.message = message;
      this.currentColor = this.service.colorPaletteByUserId(message.userId);
      this.getFileInfo(this.message.imageFileId);
    });
  }

  private readonly subs = new SubSink();

  constructor(
    public readonly service: TabChatService,
    public readonly fileService: FileUtilService,
  ) {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private getFileInfo(imageFileId: string) {
    if (!imageFileId) { return; }
    this.fileService.loadFileMetaInfo(imageFileId).toPromise().then(info => this.fileInfo = info);
  }

}
