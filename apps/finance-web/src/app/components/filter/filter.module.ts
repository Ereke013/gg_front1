import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MdePopoverModule} from "@material-extended/mde";
import {ListPopoverModule} from "@finance-web/app/components/list-popover/list-popover.module";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";



@NgModule({
  declarations: [
    FilterComponent
  ],
  exports: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    MatIconModule,
    MdePopoverModule,
    ListPopoverModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class FilterModule { }
