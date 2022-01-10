import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OverlaySingleSelectComponent} from './overlay-single-select.component';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {SearchBlockModule} from '@finance.workspace/search-block';
import {UiRadioModule} from '@finance.workspace/ui/radio';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    OverlaySingleSelectComponent,
  ],
  imports: [
    CommonModule,
    FlexModule,
    TranslateModule,
    MatIconModule,
    UiRadioModule,
    FormsModule,
    SearchBlockModule,
  ],
  exports: [
    OverlaySingleSelectComponent,
  ],
})
export class OverlaySingleSelectModule {}
