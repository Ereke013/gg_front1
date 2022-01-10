import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlayMultipleSelectComponent} from './overlay-multiple-select.component';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SearchBlockModule} from '@finance.workspace/search-block';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    FlexModule,
    TranslateModule,
    MatCheckboxModule,
    SearchBlockModule,
  ],
  declarations: [OverlayMultipleSelectComponent],
  exports: [OverlayMultipleSelectComponent],
})
export class OverlayMultipleSelectModule {}
