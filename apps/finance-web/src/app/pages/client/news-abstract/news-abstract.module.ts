import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsAbstractComponent } from './news-abstract.component';
import { NewsAbstractRoutingModule } from './news-abstract-routing.module';
import { NewsAbstractCardModule } from '@finance-web/app/components/news-abstract-card/news-abstract-card.module';
import { NewsHeaderModule } from '../../../components/news-header/news-header.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [NewsAbstractComponent],
    imports: [
        CommonModule,
        NewsAbstractRoutingModule,
        NewsAbstractCardModule,
        NewsHeaderModule,
        TranslateModule
    ]
})
export class NewsAbstractModule { }
