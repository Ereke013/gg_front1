import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAbstractCardComponent } from './news-abstract-card.component';
import { ImageCacheModule } from '../../../directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NewsAbstractCardComponent],
  exports: [
    NewsAbstractCardComponent
  ],
  imports: [
    CommonModule,
    ImageCacheModule,
    MatIconModule
  ]
})
export class NewsAbstractCardModule {
}
