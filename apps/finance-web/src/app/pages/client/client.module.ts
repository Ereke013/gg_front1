import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { ClientHeaderModule } from '@finance-web/app/components/client-header/client-header.module';
import { CreditSelectionModule } from '@finance-web/app/pages/client/credit-selection/credit-selection.module';
import { ConsumerCreditModule } from '@finance-web/app/components/consumer-credit/consumer-credit.module';
import { ConsumerCreditHeaderModule } from '@finance-web/app/components/consumer-loans-header/consumer-credit-header.module';
import { ClientFooterModule } from '@finance-web/app/components/client-footer/client-footer.module';
import { ClientCreditSelectionModule } from '@finance-web/app/components/credit-selection/client-credit-selection.module';
import { DialogChangeLocationModule } from '@finance-web/app/components/change-location/dialog-change-location.module';
import { SignModule } from '@finance-web/app/pages/client/sign/sign.module';
import { MobileHeaderModule } from '@finance-web/app/components/mobile-header/mobile-header.module';


@NgModule({
  declarations: [ClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NavigationModule,
    ClientHeaderModule,
    CreditSelectionModule,
    ConsumerCreditModule,
    ConsumerCreditHeaderModule,
    ClientFooterModule,
    ClientCreditSelectionModule,
    DialogChangeLocationModule,
    SignModule,
    MobileHeaderModule
  ]
})
export class ClientModule {
}
