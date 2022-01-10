import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ErrorPopoverComponent} from './error-popover.component';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [ErrorPopoverComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  exports: [ErrorPopoverComponent],
})
export class ErrorPopoverModule {}
