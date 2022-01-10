import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDictValueComponent} from "./edit-dict-value.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";



@NgModule({
  declarations: [EditDictValueComponent],
  exports: [
    EditDictValueComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    DragDropModule
  ]
})
export class EditDictValueModule { }
