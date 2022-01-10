import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditDictComponent} from "./edit-dict.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [EditDictComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        TranslateModule,
        MatInputModule,
        MatIconModule,
    ]
})
export class EditDictModule { }
