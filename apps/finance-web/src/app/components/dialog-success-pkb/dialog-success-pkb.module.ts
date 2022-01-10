import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogSuccessPkbComponent } from './dialog-success-pkb.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DialogSuccessPkbComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatIconModule
  ]
})
export class DialogSuccessPkbModule {
}
