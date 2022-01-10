import {Component, ElementRef, HostBinding, NgModule} from '@angular/core';
import {DffControl} from '@finance.workspace/dynamic-form';
import {
  DffValueFileUpload,
  FieldParamFileUpload,
  FileMetaInfo,
  FileUploadViewType,
  FormField,
} from '@finance.workspace/shared/model';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {filter, mapTo, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {forkJoin} from 'rxjs';
import {Popover} from '@finance.workspace/popover';
import {FileUtilService} from '@finance.workspace/file-util';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {FileSelectorModule} from '@finance.workspace/file-selector';
import {DffLabelModule} from '@finance-web/shared/dff/dff-label/dff-label.module';
import {AbstractDffDirectiveFormField} from '@finance-web/shared/dff/AbstractDffDirectiveFormField';

@Component({
  templateUrl: './dff-file-upload.component.html',
  styleUrls: ['./dff-file-upload.component.scss'],
})
export class DffFileUploadComponent extends AbstractDffDirectiveFormField {

  FileUploadViewType = FileUploadViewType;
  fileList: FileMetaInfo[] = [];

  constructor(
    elementRef: ElementRef,
    popover: Popover,
    readonly fieldControl: DffControl<FormField>,
    readonly fileUtilService: FileUtilService,
  ) {
    super(elementRef, popover, fieldControl);
  }

  get val(): DffValueFileUpload {
    return super.val;
  }

  get params(): FieldParamFileUpload {
    return <FieldParamFileUpload>this.f.params;
  }

  get fileSelectorType() {
    switch (this.params.viewType) {
      case FileUploadViewType.MULTIPLE:
      case FileUploadViewType.SINGLE:
        return 'list';
      case FileUploadViewType.TILE:
        return 'tile';

      default:
        return 'list';
    }
  }

  @HostBinding('style.flex-direction') get flexDirection() {
    return this.oneLineMode ? 'row' : 'column';
  }

  get oneLineMode() {
    return this.f.gridPosition?.rows <= 2;
  }

  afterWriteValue() {
    this.refreshMetaInfo();
  }

  private refreshMetaInfo() {
    this.fileUtilService.loadFileMetaInfo(this.val.fileIds).subscribe(res => this.fileList = res);
  }

  fileChanged(event) {
    const files: File[] = event.target.files; // it is an object
    const obsList: Observable<void>[] = [];
    for (const file of files) {
      obsList.push(this.uploadOneFile(file));
    }
    forkJoin(obsList).subscribe({ complete: () => this.onComplete() });
  }

  uploadOneFile(file: File): Observable<void> {
    return this.fileUtilService.upload(file).pipe(
      filter(x => x.type === HttpEventType.Response),
      tap(event => this.onUpload(event)),
      mapTo(undefined),
    );
  }

  private onUpload(event: HttpEvent<string>) {
    if (event.type !== HttpEventType.Response) { return; }
    const fileId = JSON.parse(event.body);
    if (this.params.viewType === FileUploadViewType.SINGLE) {
      this.val.fileIds = [fileId];
      return;
    }
    this.val.fileIds.push(fileId);
  }

  private onComplete() {
    this.changeValue();
    this.refreshMetaInfo();
  }

  removeById(id: string) {
    if (this.f.isReadonly) {
      return;
    }
    this.val.fileIds = this.val.fileIds.filter(value => value !== id);
    this.fileList = this.fileList.filter(x => x.fileId !== id);
    this.changeValue();
  }

}

@NgModule({
  declarations: [DffFileUploadComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FileSelectorModule,
    DffLabelModule,
  ],
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Module {}
