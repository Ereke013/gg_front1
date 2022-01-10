import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParamTestPageComponent} from "./param-test-page.component";
import {ParamTestPageRoutingModule} from "@finance-web/app/pages/admin/param-test-page/param-test-page-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";



@NgModule({
  declarations: [ParamTestPageComponent],
  imports: [
    CommonModule,
    ParamTestPageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatDividerModule,
  ]
})
export class ParamTestPageModule { }
