import {NgModule} from '@angular/core';
import {DynamicFormComponent} from './dynamic-form.component';
import {DffCommonComponent} from './dff-common.component';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {KtdGridModule} from '@katoid/angular-grid-layout';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DffCommonComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    KtdGridModule,
  ],
  exports: [
    DynamicFormComponent,
    DffCommonComponent,
  ],
})
export class DynamicFormModule {}
