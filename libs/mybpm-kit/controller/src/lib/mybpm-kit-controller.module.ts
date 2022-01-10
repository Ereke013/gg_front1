import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpServiceModule} from '@finance.workspace/http-service';

@NgModule({
  imports: [CommonModule, HttpServiceModule],
})
export class MybpmKitControllerModule {}
