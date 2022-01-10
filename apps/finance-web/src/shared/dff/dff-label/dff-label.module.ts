import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DffLabelComponent} from './dff-label.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {ErrorPopoverModule} from '@finance.workspace/error-popover';
import {PopoverModule} from '@finance.workspace/popover';

@NgModule({
  declarations: [DffLabelComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule,
    ErrorPopoverModule,
    PopoverModule,
  ],
  exports: [DffLabelComponent],
})
export class DffLabelModule {}
