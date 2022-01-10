import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FocusOnInitDirective} from './focus-on-init.directive';

@NgModule({
  declarations: [FocusOnInitDirective],
  imports: [CommonModule],
  exports: [FocusOnInitDirective],
})
export class FocusOnInitModule {}
