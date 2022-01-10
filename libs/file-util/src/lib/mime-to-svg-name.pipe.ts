import {Pipe, PipeTransform} from '@angular/core';
import {FileUtilService} from './file-util.service';

@Pipe({ name: 'mimeToSvgName' })
export class MimeToSvgNamePipe implements PipeTransform {

  constructor(
    private readonly service: FileUtilService,
  ) {}

  transform(mimeType: string): string {
    return this.service.mimeTypeToSvgName(mimeType);
  }

}
