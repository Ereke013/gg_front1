import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ProfileController} from "@finance-web/controller/ProfileController";
import {FileInfo} from "@finance-web/models/file/FileInfo";
import {BankContactController} from "@finance-web/controller/BankContactController";
import {PledgeApplication} from "@finance-web/models/application/PledgeApplication";
import {DocumentApplication} from "@finance-web/models/application/DocumentApplication";

@Component({
  selector: 'app-dialog-document-client',
  templateUrl: './dialog-document-client.component.html',
  styleUrls: ['./dialog-document-client.component.scss']
})
export class DialogDocumentClientComponent implements OnInit {
  isDocMenu: boolean = false;

  documents: FileInfo[] = [];
  documentsShow: FileInfo[] = [];

  docApplication: DocumentApplication[] = [];


  @ViewChild('documentId') documentId: ElementRef;
  @ViewChild('addDocButton') addDocButton: ElementRef;

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (this.documentId && event.target !== this.addDocButton.nativeElement) {
      if (!this.documentId.nativeElement.contains(event.target)) {
        this.isDocMenu = false;
      }
    }
  }

  constructor(private dialogRef: MatDialogRef<DialogDocumentClientComponent>,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) private data,
              private profileController: ProfileController,
              private bankController: BankContactController) {
  }

  ngOnInit(): void {
    this.profileController.getDocuments().then(res => {
      this.documents = res;

      if (this.data.selectedList && this.data.selectedList.length > 0) {
        for (const doc of this.data.selectedList) {
          const idx = this.documents.findIndex(x => x.fileId === doc.fileId);
          if (idx != -1) {
            this.notSelectedDocList(idx);
          }
        }
      }
    });
  }

  sendApplication() {
    this.save();
    this.dialogRef.close({
      code: 'sending',
      listDoc: this.docApplication
    });
  }

  notSelectedDocList(i: number) {
    const doc: FileInfo = this.documents[i];
    if (doc) {
      this.documentsShow.push(doc);
      this.documents.splice(i, 1);
    }
  }

  addDoc() {
    this.isDocMenu = true;
  }

  removeSelectedDocument(i: number) {
    const doc: FileInfo = this.documentsShow[i];
    if (doc) {
      this.documents.push(doc);
      this.documentsShow.splice(i, 1);
    }
  }

  onFileChanged(event: any) {
    const fileInfo: FileInfo = {} as FileInfo;
    const reader = new FileReader();
    fileInfo.name = event.target.files[0].name;
    fileInfo.size = event.target.files[0].size;
    fileInfo.mimeType = event.target.files[0].type;
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = async (ev: any) => {
      fileInfo.base64data = ev.target.result.split(',')[1];
      this.bankController.saveFileId(fileInfo).then(x => {
        fileInfo.fileId = x;
        this.profileController.saveDocument(x);
        this.documentsShow.push(fileInfo);
        this.isDocMenu = false;
      });
    };
  }

  save() {
    if (this.documentsShow && this.documentsShow.length > 0) {
      for (const doc of this.documentsShow) {
        const docAppl: DocumentApplication = {
          applicationId: this.data.applicationId,
          id: 0,
          documentId: 0,
          fileId: doc.fileId
        };
        this.docApplication.push(docAppl);
      }
      this.dialogRef.close(this.docApplication);
    } else {
      this.dialogRef.close(null);
    }
  }

  back() {
    for (const doc of this.documentsShow) {
      const docAppl: DocumentApplication = {
        applicationId: this.data.applicationId,
        id: 0,
        documentId: 0,
        fileId: doc.fileId
      };
      this.docApplication.push(docAppl);
    }

    this.dialogRef.close({
      code: 'back',
      listDoc: this.docApplication
    });
  }
}
