import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditProductParametersComponent} from "./edit-product-parameters.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {TranslateModule} from "@ngx-translate/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {DynamicFormFieldsModule} from "@finance-web/app/dynamic-form-fields/dynamic-form-fields.module";


@NgModule({
  declarations: [EditProductParametersComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        TranslateModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        DynamicFormFieldsModule
    ],
})
export class EditProductParametersModule { }
