import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchBlockComponent} from './search-block.component';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [SearchBlockComponent],
  imports: [CommonModule, MatIconModule, FlexModule, TranslateModule],
  exports: [SearchBlockComponent],
})
export class SearchBlockModule {}
