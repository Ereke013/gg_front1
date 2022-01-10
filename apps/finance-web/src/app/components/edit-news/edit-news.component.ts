import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminController } from '../../../controller/AdminController';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewsRecord } from '../../../models/news/NewsRecord';
import { FileInfo } from '../../../models/file/FileInfo';
import { BankContactController } from '../../../controller/BankContactController';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss']
})
export class EditNewsComponent implements OnInit {

  form: FormGroup;
  preview: FileInfo = { fileId: null, base64data: null, data: null, name: null, mimeType: null, size: null };
  buttonText: string = 'Выбрать превью';

  constructor(@Inject(MAT_DIALOG_DATA) private id,
              private fb: FormBuilder,
              private dialogRef: MatDialogRef<EditNewsComponent>,
              private bankController: BankContactController,
              private adminController: AdminController) {
    this.form = this.fb.group({
      fullText: ['', Validators.required],
      title: ['', Validators.required],
      previewId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.id != null) {
      this.adminController.getNewsDetail(this.id).then(x => {
        this.form.patchValue(x);
        this.preview.fileId = x.previewId;
        if (this.preview.fileId != null) {
          this.buttonText = 'Изменить превью';
        }
      });
    }
  }

  onSubmit() {
    const newsRecord = this.form.getRawValue() as NewsRecord;
    newsRecord.id = this.id;

    if(!newsRecord.fullText.includes('class="quill-img"')){
      newsRecord.fullText = newsRecord.fullText.replace('<img', '<img class="quill-img"');
    }
    this.adminController.saveNews(newsRecord).then(() => this.dialogRef.close());
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
      this.preview = fileInfo;
      this.buttonText = 'Изменить превью';
      await this.bankController.saveFileId(this.preview).then(x => this.preview.fileId = x);
      this.form.get('previewId').setValue(this.preview.fileId);
    };
  }
}
