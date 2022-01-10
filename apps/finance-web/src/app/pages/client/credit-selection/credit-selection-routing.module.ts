import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditSelectionComponent } from '@finance-web/app/pages/client/credit-selection/credit-selection.component';

const routes: Routes = [
  {
    path: '',
    component: CreditSelectionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditSelectionRoutingModule {
}
