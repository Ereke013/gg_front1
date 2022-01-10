import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from '@finance-web/app/pages/admin/news/news-routing.module';
import { AdminItemPageModule } from '../../../components/admin-item-page/admin-item-page.module';
import { EditNewsModule } from '../../../components/edit-news/edit-news.module';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    AdminItemPageModule,
    EditNewsModule
  ]
})
export class NewsModule { }
