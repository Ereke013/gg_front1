import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditHistoryComponent } from './credit-history.component';
import { TranslateModule } from '@ngx-translate/core';
import { DialogPkbModule } from '@finance-web/app/components/dialog-pkb/dialog-pkb.module';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [CreditHistoryComponent],
  exports: [
    CreditHistoryComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        DialogPkbModule,
        MatTableModule
    ]
})
export class CreditHistoryModule {
}
