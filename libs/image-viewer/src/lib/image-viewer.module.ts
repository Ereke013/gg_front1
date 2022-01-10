import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageViewerComponent} from './image-viewer.component';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {ImageUrlModule} from '@finance.workspace/image-url';
import {FileUtilModule} from '@finance.workspace/file-util';
import {ViewImageOnClickDirective} from './view-image-on-click.directive';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    ImageUrlModule,
    FileUtilModule,
    MatDialogModule,
  ],
  declarations: [ImageViewerComponent, ViewImageOnClickDirective],
  exports: [ImageViewerComponent, ViewImageOnClickDirective],
})
export class ImageViewerModule {}
