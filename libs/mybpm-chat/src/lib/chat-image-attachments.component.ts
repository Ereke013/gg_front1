import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {FileMetaInfo} from '@finance.workspace/shared/model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TabChatService} from './tab-chat.service';

@Component({
  templateUrl: './chat-image-attachments.component.html',
  styleUrls: ['./chat-image-attachments.component.scss'],
})
export class ChatImageAttachmentsComponent {

  @ViewChild('inputText') inputTextRef: ElementRef;
  attachment: FileMetaInfo;

  constructor(
    private readonly dialogRef: MatDialogRef<ChatImageAttachmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public readonly service: TabChatService,
  ) {
    this.attachment = data.attachment;
  }

  get inputText(): string {
    return this.inputTextRef.nativeElement.innerText;
  }

  sendToInput() {
    this.dialogRef.close({ text: this.inputText });
  }

  closeClicked() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

}
