import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UiChipComponent} from './ui-chip.component';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [
    UiChipComponent,
  ],
  exports: [UiChipComponent],
})
export class UiChipModule {}
