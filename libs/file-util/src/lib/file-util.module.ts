import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MimeToSvgNamePipe} from './mime-to-svg-name.pipe';
import {FileUtilService} from './file-util.service';
import {IsMimePipe} from './is-mime.pipe';
import {DownloadOnClickDirective} from './download-on-click.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [MimeToSvgNamePipe, IsMimePipe, DownloadOnClickDirective],
  exports: [MimeToSvgNamePipe, IsMimePipe, DownloadOnClickDirective],
})
export class FileUtilModule {

  static forRoot(): ModuleWithProviders<FileUtilModule> {
    return {
      ngModule: FileUtilModule,
      providers: [FileUtilService],
    };
  }

}
