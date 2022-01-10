import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DeleteDialogWindowComponent} from "@finance-web/app/components/delete-dialog-window/delete-dialog-window.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [DeleteDialogWindowComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        TranslateModule
    ]
})
export class DeleteDialogWindowModule { }
