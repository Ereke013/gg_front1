import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { ApplicationComponent } from './application.component';
import { AdminItemPageModule } from '@finance-web/app/components/admin-item-page/admin-item-page.module';


@NgModule({
  declarations: [ApplicationComponent],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    AdminItemPageModule
  ]
})
export class ApplicationModule { }
