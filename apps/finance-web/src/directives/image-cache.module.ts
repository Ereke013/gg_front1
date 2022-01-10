import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCacheDirective } from './image-cache.directive';


@NgModule({
  declarations: [ImageCacheDirective],
  exports: [ImageCacheDirective],
  imports: [
    CommonModule
  ]
})
export class ImageCacheModule {
}
