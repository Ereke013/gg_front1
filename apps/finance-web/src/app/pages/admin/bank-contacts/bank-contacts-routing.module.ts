import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankContactsComponent } from '@finance-web/app/pages/admin/bank-contacts/bank-contacts.component';

const routes: Routes = [
  {
    path: '',
    component: BankContactsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankContactsRoutingModule { }
