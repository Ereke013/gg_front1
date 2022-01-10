import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPkbComponent } from './dialog-pkb.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslateModule } from '@ngx-translate/core';
import { DialogSuccessPkbModule } from '@finance-web/app/components/dialog-success-pkb/dialog-success-pkb.module';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [DialogPkbComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TranslateModule,
    MatIconModule,
    DialogSuccessPkbModule,
    NgxMaskModule,
    FormsModule
  ]
})
export class DialogPkbModule {
}
