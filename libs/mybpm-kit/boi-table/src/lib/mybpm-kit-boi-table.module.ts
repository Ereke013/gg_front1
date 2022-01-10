import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiBoiTableComponent} from './api-boi-table.component';
import {LoadingModule} from '@finance.workspace/loading';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ClickUtilModule} from '@finance.workspace/click-util';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [ApiBoiTableComponent],
  imports: [
    CommonModule,
    LoadingModule,
    ClickUtilModule,
    InfiniteScrollModule,
    MatIconModule,
  ],
  exports: [ApiBoiTableComponent],
})
export class MybpmKitBoiTableModule {}
