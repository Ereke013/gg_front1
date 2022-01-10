import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClickPreventDefaultDirective} from './click-prevent-default.directive';
import {ClickStopPropagationDirective} from './click-stop-propagation.directive';
import {ClickBindDirective} from './click-bind.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [ClickPreventDefaultDirective, ClickStopPropagationDirective, ClickBindDirective],
  exports: [ClickPreventDefaultDirective, ClickStopPropagationDirective, ClickBindDirective],
})
export class ClickUtilModule {}
