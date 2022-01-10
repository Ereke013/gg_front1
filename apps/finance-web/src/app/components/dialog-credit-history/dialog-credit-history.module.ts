import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCreditHistoryComponent } from './dialog-credit-history.component';
import { MatIconModule } from '@angular/material/icon';
import {NgxMaskModule} from "ngx-mask";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [DialogCreditHistoryComponent],
  imports: [
    CommonModule,
    MatIconModule,
    NgxMaskModule,
    TranslateModule,
    FormsModule,
    MatSelectModule
  ]
})
export class DialogCreditHistoryModule {
}
