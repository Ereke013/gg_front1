import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ComboBoxComponent } from './combo-box.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ComboBoxComponent],
  exports: [
    ComboBoxComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule,
    NzToolTipModule,
    FormsModule
  ]
})
export class ComboBoxModule {
}
