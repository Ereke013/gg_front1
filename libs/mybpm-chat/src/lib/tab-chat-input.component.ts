import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ChatImageAttachmentsComponent} from './chat-image-attachments.component';
import {FileMetaInfo, OrgUnitId, OrgUnitRecord, OrgUnitType} from '@finance.workspace/shared/model';
import {Popover, PopoverRef, Position} from '@finance.workspace/popover';
import {HttpEventType} from '@angular/common/http';
import {SubSink} from '@finance.workspace/shared/util';
import {FileUtilService} from '@finance.workspace/file-util';
import {TabChatService} from './tab-chat.service';

@Component({
  selector: 'app-tab-chat-input',
  templateUrl: './tab-chat-input.component.html',
  styleUrls: ['./tab-chat-input.component.scss'],
})

export class TabChatInputComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('inputSpan') inputSpan: ElementRef;
  @ViewChild('orgUnitSelect') orgUnitSelect: TemplateRef<any>;
  @ViewChild('file') inputFile: ElementRef;

  @Input() value: string;
  @Input() atSignEnabled = true;
  @Output() sendMessageClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() fileAttached: EventEmitter<FileMetaInfo> = new EventEmitter<FileMetaInfo>();
  @Output() addMember: EventEmitter<OrgUnitRecord> = new EventEmitter<OrgUnitRecord>();
  @Output() deleteMember: EventEmitter<OrgUnitRecord> = new EventEmitter<OrgUnitRecord>();

  members: OrgUnitRecord[] = [];
  attachment: FileMetaInfo;
  popoverRef: PopoverRef;
  lastInnerText: string;
  ignoredOrgUnitId: OrgUnitId;
  private readonly unsub = new SubSink();

  constructor(private readonly matDialog: MatDialog,
              private readonly popover: Popover,
              private readonly fileService: FileUtilService,
              private readonly chatService: TabChatService,
  ) {
  }

  ngOnInit() {
    this.ignoredOrgUnitId = {
      id: this.chatService.userId,
      type: OrgUnitType.PERSON,
    };
  }

  ngAfterViewInit() {
    if (this.value) {
      this.inputSpan.nativeElement.innerText = this.value;
    }
  }

  ngOnDestroy(): void {
    if (this.popoverRef) {
      this.popoverRef.close();
    }
    this.unsub.unsubscribe();
  }

  onTextChanged(innerText: string) {
    this.valueChanged.emit(innerText);
    this.parseAtSignSymbol(innerText);
  }

  send(message: string, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.sendMessageClicked.emit(message);
    this.inputSpan.nativeElement.innerText = '';
  }

  fileChanged($event: any) {
    const files: File[] = [...$event.target.files];
    const file = files[0];
    if (!file) {
      return;
    }
    this.unsub.sink = this.fileService.upload(file).subscribe(resp => {
      if (resp.type !== HttpEventType.Response) {
        return;
      }
      this.attachment = {
        fileId: JSON.parse(resp.body),
        fileName: file.name,
        mimeType: file.type,
        createdAt: new Date(),
      };
      this.matDialog.open(ChatImageAttachmentsComponent,
        {
          height: 'auto', width: 'auto', data: { attachment: this.attachment },
        },
      ).afterClosed().subscribe(data => {
        this.unsub.unsubscribe();
        if (!data || !this.attachment) {
          return;
        }
        this.fileAttached.emit(this.attachment);
        this.sendMessageClicked.emit(data.text);
        this.inputSpan.nativeElement.innerText = '';
      });
    });
  }

  openAttachments() {
    this.inputFile.nativeElement.click();
  }

  parseAtSignSymbol(innerText: string) {
    if (!this.atSignEnabled) {
      return;
    }
    const lastCharOfInnerText = innerText[innerText.length - 1];
    if (this.popoverRef) {
      this.popoverRef.close();
    }
    if (lastCharOfInnerText && lastCharOfInnerText === '@') {
      this.openMemberSelector();
    }
  }

  openMemberSelector() {
    if (!this.lastInnerText) {
      this.lastInnerText = this.inputSpan.nativeElement.innerHTML;
    }
    const origin = this.inputSpan.nativeElement;
    const content = this.orgUnitSelect;
    const position = Position.top;
    const hasBackdrop = true;
    const needArrow = false;
    this.popoverRef = this.popover.open({ origin, content, hasBackdrop, position, needArrow });
    this.popoverRef.afterClosed.subscribe(() => {
      this.lastInnerText = undefined;
      this.members = [];
    });
  }

  printMembers() {
    return '<strong contenteditable="false">@' + this.members.map(f => '@' + f.name).join(', ').slice(1) + '</strong> ';
  }

  addMemberToInnerText(record: OrgUnitRecord) {
    this.addMember.emit(record);
    this.addMemberToList(record);
    this.inputSpan.nativeElement.innerHTML =
      (this.lastInnerText.slice(0, this.lastInnerText.length - 1) + this.printMembers());
  }

  deleteMemberFromInnerText(record: OrgUnitRecord) {
    this.deleteMember.emit(record);
    this.deleteMemberFromList(record);
    this.inputSpan.nativeElement.innerHTML = (this.lastInnerText.slice(0, this.lastInnerText.length - 1) + this.printMembers());
  }

  addMemberToList(record: OrgUnitRecord) {
    this.members.push(record);
  }

  deleteMemberFromList(record: OrgUnitRecord) {
    this.members = this.members.filter(f => f.id !== record.id);
  }

  focusOnInputSpan() {
    setTimeout(() => this.inputSpan.nativeElement.focus(), 100);
  }

  pasteFile(event: ClipboardEvent) {
    event.stopPropagation();
    const files: FileList = event.clipboardData.files;
    const file = files.item(0);
    if (!file) {
      return;
    }
    event.preventDefault();
    this.unsub.sink = this.fileService.upload(file).subscribe(resp => {
      if (resp.type !== HttpEventType.Response) {
        return;
      }
      this.attachment = {
        fileId: JSON.parse(resp.body),
        fileName: file.name,
        mimeType: file.type,
        createdAt: new Date(),
      };

      this.unsub.unsubscribe();
      if (!this.attachment) {
        return;
      }
      this.fileAttached.emit(this.attachment);
      this.sendMessageClicked.emit(null);
    });

  }

  closePopover() {
    if (this.popoverRef) {
      this.popoverRef.close();
    }
  }

  focusInEnd(element: HTMLElement) {
    focusInEnd(element);
  }
}

function focusInEnd(el: HTMLElement) {
  el.focus();
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}
