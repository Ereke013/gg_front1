import {Directive, HostListener, Input} from '@angular/core';
import {FileUtilService} from '@finance.workspace/file-util';
import {MatDialog} from '@angular/material/dialog';
import {ImageViewerComponent} from '@finance.workspace/image-viewer';

@Directive({ selector: '[appViewOrDownload]' })
export class ViewOrDownloadDirective {

  @Input('appViewOrDownload') fileId: string;
  @Input('appViewOrDownloadMime') mime: string;

  constructor(
    private readonly service: FileUtilService,
    private readonly dialog: MatDialog,
  ) {}

  @HostListener('click')
  onHostClick() {
    const isImage = this.service.isMime(this.mime, 'image');
    if (isImage) {
      this.dialog.open(ImageViewerComponent, { data: this.fileId });
    } else {
      this.service.download(this.fileId);
    }
  }

}
