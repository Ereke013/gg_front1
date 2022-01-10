import {Pipe, PipeTransform} from '@angular/core';
import {FileType, FileUtilService } from './file-util.service';

@Pipe({ name: 'isMime' })
export class IsMimePipe implements PipeTransform {

  constructor(
    private readonly service: FileUtilService,
  ) {}

  transform(mimeType: string, type: FileType): boolean {
    return this.service.isMime(mimeType, type);
  }

}
