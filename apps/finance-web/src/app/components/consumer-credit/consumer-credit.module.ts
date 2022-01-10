import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ConsumerCreditComponent } from './consumer-credit.component';
import { DialogBankContactsModule } from '@finance-web/app/components/dialog-bank-contacts/dialog-bank-contacts.module';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { ApplicationCardModule } from '@finance-web/app/components/product-card/application-card.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [ConsumerCreditComponent],
  exports: [
    ConsumerCreditComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule,
    DialogBankContactsModule,
    ImageCacheModule,
    ApplicationCardModule,
    MatSelectModule,
    FormsModule,
    MatTooltipModule
  ]
})
export class ConsumerCreditModule {
}
