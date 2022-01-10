import {InjectionToken} from '@angular/core';
import {Observable} from 'rxjs';
import {FileMetaInfo} from '@finance.workspace/shared/model';
import {HttpEvent} from '@angular/common/http';

export const FILE_SERVICE = new InjectionToken('IFileService');

export interface IFileService {

  downloadFile(fileId: string): void;

  uploadFile(file: File): Observable<HttpEvent<string>>;

  loadFileMetaInfo(fileIds: string | string[]): Observable<FileMetaInfo | FileMetaInfo[]>;
}
