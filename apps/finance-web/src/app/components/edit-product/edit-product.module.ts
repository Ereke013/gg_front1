import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {EditProductComponent} from "./edit-product.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDividerModule} from "@angular/material/divider";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {DynamicFormFieldsModule} from "@finance-web/app/dynamic-form-fields/dynamic-form-fields.module";
import { MatTabsModule } from '@angular/material/tabs';



@NgModule({
  declarations: [EditProductComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
    DynamicFormFieldsModule,
    MatTabsModule
  ],
  providers:[DatePipe]
})
export class EditProductModule { }
