import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductParameterSettingsComponent} from "./product-parameter-settings.component";
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDividerModule} from "@angular/material/divider";
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [ProductParameterSettingsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    TranslateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDividerModule,
    DragDropModule,
    FormsModule
  ]
})
export class ProductParameterSettingsModule { }
