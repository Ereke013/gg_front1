import {Directive, HostListener, Input} from '@angular/core';
import {FileUtilService} from './file-util.service';

@Directive({ selector: '[appDownloadOnClick]' })
export class DownloadOnClickDirective {
  @Input('appDownloadOnClick') fileId: string;

  constructor(
    private readonly service: FileUtilService,
  ) {}

  @HostListener('click')
  onHostClick() {
    this.service.download(this.fileId);
  }

}
