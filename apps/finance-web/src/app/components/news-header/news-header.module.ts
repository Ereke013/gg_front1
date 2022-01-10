import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsHeaderComponent } from './news-header.component';


@NgModule({
  declarations: [NewsHeaderComponent],
  exports: [
    NewsHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NewsHeaderModule {
}
