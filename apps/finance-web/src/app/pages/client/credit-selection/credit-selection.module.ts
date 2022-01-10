import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditSelectionComponent } from './credit-selection.component';
import { CreditSelectionRoutingModule } from './credit-selection-routing.module';
import { ConsumerCreditModule } from '@finance-web/app/components/consumer-credit/consumer-credit.module';
import { AllFiltersModule } from '@finance-web/app/components/all-filters/all-filters.module';
import { ClientCreditSelectionModule } from '@finance-web/app/components/credit-selection/client-credit-selection.module';
import { ComboBoxModule } from '@finance-web/app/components/combo-box/combo-box.module';
import { ConsumerCreditHeaderModule } from '@finance-web/app/components/consumer-loans-header/consumer-credit-header.module';


@NgModule({
  declarations: [CreditSelectionComponent],
  imports: [
    CommonModule,
    CreditSelectionRoutingModule,
    ConsumerCreditModule,
    AllFiltersModule,
    ClientCreditSelectionModule,
    ComboBoxModule,
    ConsumerCreditHeaderModule
  ]
})
export class CreditSelectionModule {
}
