import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyDialogWindowComponent } from './copy-dialog-window.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CopyDialogWindowComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class CopyDialogWindowModule { }
