import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageViewerModule} from '@finance.workspace/image-viewer';
import {FileUtilModule} from '@finance.workspace/file-util';
import {ViewOrDownloadDirective} from './view-or-download.directive';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule, ImageViewerModule, FileUtilModule],
  declarations: [ViewOrDownloadDirective],
  exports: [ViewOrDownloadDirective],
})
export class FileViewerModule {}
