import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFullScreenComponent } from './news-full-screen.component';
import { NewsFullScreenRoutingModule } from './news-full-screen-routing.module';
import { NewsHeaderModule } from '../../../components/news-header/news-header.module';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [NewsFullScreenComponent],
  imports: [
    CommonModule,
    NewsFullScreenRoutingModule,
    NewsHeaderModule,
    MatIconModule,
    TranslateModule
  ]
})
export class NewsFullScreenModule { }
