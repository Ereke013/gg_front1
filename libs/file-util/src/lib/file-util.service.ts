import {Inject, Injectable} from '@angular/core';
import {FILE_SERVICE, IFileService} from './file.service';
import {Observable} from 'rxjs/internal/Observable';
import {HttpEvent} from '@angular/common/http';
import {FileMetaInfo} from '@finance.workspace/shared/model';
import {NativeFileSelectorConfig} from './model/NativeFileSelectorConfig';
import {Subject} from 'rxjs';

export type FileType = 'file' | 'image';

@Injectable()
export class FileUtilService {

  private readonly mimeMap: { [mimeType: string]: { svgIcon: string, type: FileType[] }; } = {};

  constructor(
    @Inject(FILE_SERVICE)
    private readonly service: IFileService,
  ) {
    this.registerDefaults();
  }

  download(fileId: string): void {
    this.service.downloadFile(fileId);
  }

  upload(file: File): Observable<HttpEvent<string>> {
    return this.service.uploadFile(file);
  }

  loadFileMetaInfo(fileId: string): Observable<FileMetaInfo>;
  loadFileMetaInfo(fileIds: string[]): Observable<FileMetaInfo[]>;
  loadFileMetaInfo(fileIds: string | string[]): Observable<FileMetaInfo | FileMetaInfo[]> {
    return this.service.loadFileMetaInfo(fileIds);
  }

  mimeTypeToSvgName(mimeType: string): string {
    return this.mimeMap[mimeType]?.svgIcon ?? 'file';
  }

  register(mimeType: string, svgIcon: string, type: FileType[]) {
    this.mimeMap[mimeType] = { svgIcon, type };
  }

  isMime(mimeType: string, type: FileType): boolean {
    return this.mimeMap[mimeType]?.type.includes(type);
  }

  openNativeFileSelector(config?: NativeFileSelectorConfig): Observable<FileList> {

    config = config ?? { accept: undefined, multiple: false };

    const subject = new Subject<FileList>();

    const input = document.createElement('input');
    input.hidden = true;
    input.type = 'file';
    input.accept = config.accept;
    input.multiple = config.multiple;
    input.click();

    input.onchange = ev => {
      const files = <FileList>(<any>ev.target).files;
      subject.next(files);
      subject.complete();
    };

    return subject.asObservable();

  }

  private registerDefaults() {
    //region files
    this.register('application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'microsoft-word', ['file']);
    this.register('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'microsoft-excel', ['file']);
    this.register('application/vnd.openxmlformats-officedocument.presentationml.presentation', 'presentation', ['file']);
    this.register('application/vnd.ms-powerpoint', 'presentation', ['file']);
    this.register('application/pdf', 'pdf', ['file']);
    //endregion

    //region images
    this.register('image/png', 'images', ['image']);
    this.register('image/jpeg', 'images', ['image']);
    this.register('image/gif', 'images', ['image']);
    this.register('image/jpeg', 'images', ['image']);
    this.register('image/pjpeg', 'images', ['image']);
    this.register('image/png', 'images', ['image']);
    this.register('image/svg+xml', 'images', ['image']);
    this.register('image/tiff', 'images', ['image']);
    this.register('image/vnd.microsoft.icon', 'images', ['image']);
    this.register('image/vnd.wap.wbmp', 'images', ['image']);
    this.register('image/webp', 'images', ['image']);
    //endregion
  }
}
