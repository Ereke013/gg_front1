import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MybpmAddButtonComponent} from './mybpm-add-button.component';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [CommonModule, MatIconModule, TranslateModule],
  declarations: [MybpmAddButtonComponent],
  exports: [MybpmAddButtonComponent],
})
export class MybpmAddButtonModule {}
