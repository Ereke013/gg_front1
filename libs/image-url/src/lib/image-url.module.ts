import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImageUrlService} from './image-url.service';
import {ImageUrlPipe} from './image-url.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [ImageUrlPipe],
  exports: [ImageUrlPipe],
})
export class ImageUrlModule {

  static forRoot(urlPrefix: string): ModuleWithProviders<ImageUrlModule> {
    return {
      ngModule: ImageUrlModule,
      providers: [
        { provide: ImageUrlService, useFactory: () => new ImageUrlService(urlPrefix) },
      ],
    };
  }

}
