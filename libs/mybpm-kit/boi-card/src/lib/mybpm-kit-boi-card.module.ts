import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiBoiCardComponent} from './api-boi-card.component';
import {DynamicFormModule} from '@finance.workspace/dynamic-form';

@NgModule({
  imports: [CommonModule, DynamicFormModule],
  declarations: [ApiBoiCardComponent],
  exports: [ApiBoiCardComponent],
})
export class MybpmKitBoiCardModule {}
