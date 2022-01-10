import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankContactsRoutingModule } from './bank-contacts-routing.module';
import { BankContactsComponent } from './bank-contacts.component';
import { AdminItemPageModule } from '@finance-web/app/components/admin-item-page/admin-item-page.module';


@NgModule({
  declarations: [BankContactsComponent],
  imports: [
    CommonModule,
    BankContactsRoutingModule,
    AdminItemPageModule
  ]
})
export class BankContactsModule { }
