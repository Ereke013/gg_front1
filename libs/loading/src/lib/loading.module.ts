import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingDirective} from './loading.directive';
import {DefaultLoadingComponent} from './default-loading.component';
import {DefaultErrorComponent} from './default-error.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingDirective, DefaultLoadingComponent, DefaultErrorComponent],
  exports: [LoadingDirective, DefaultLoadingComponent],
})
export class LoadingModule {}
