import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileSelectorComponent} from './file-selector.component';
import {MatIconModule} from '@angular/material/icon';
import {FileUtilModule} from '@finance.workspace/file-util';
import {FileViewerModule} from '@finance.workspace/file-viewer';
import {ClickUtilModule} from '@finance.workspace/click-util';
import {ImageUrlModule} from '@finance.workspace/image-url';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FileUtilModule,
    FileViewerModule,
    ClickUtilModule,
    ImageUrlModule,
  ],
  declarations: [FileSelectorComponent],
  exports: [FileSelectorComponent],
})
export class FileSelectorModule {}
