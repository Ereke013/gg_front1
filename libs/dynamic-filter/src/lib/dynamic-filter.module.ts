import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFilterComponent} from './dynamic-filter.component';
import {ClickUtilModule} from '@finance.workspace/click-util';
import {TranslateModule} from '@ngx-translate/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FilterFieldComponent} from './filter-field.component';
import {UiChipModule} from '@finance.workspace/ui/chip';

@NgModule({
  declarations: [DynamicFilterComponent, FilterFieldComponent],
  imports: [
    CommonModule,
    ClickUtilModule,
    UiChipModule,
    TranslateModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [DynamicFilterComponent],
})
export class DynamicFilterModule {}
