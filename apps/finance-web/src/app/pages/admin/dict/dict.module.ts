import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DictComponent} from "./dict.component";
import {DictRoutingModule} from "@finance-web/app/pages/admin/dict/dict-routing.module";
import {FilterModule} from "@finance-web/app/components/filter/filter.module";
import {TranslateModule} from "@ngx-translate/core";
import {MybpmAddButtonModule} from "@finance-web/shared/add-button/mybpm-add-button.module";
import {MatIconModule} from "@angular/material/icon";
import {FlexModule} from "@angular/flex-layout";
import {InstanceTableModule} from "@finance-web/app/components/instance-table/instance-table.module";
import {AdminItemPageModule} from "@finance-web/app/components/admin-item-page/admin-item-page.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {EditDictValueModule} from "@finance-web/app/components/edit-dict-value/edit-dict-value.module";



@NgModule({
  declarations: [DictComponent],
  imports: [
    CommonModule,
    DictRoutingModule,
    FilterModule,
    TranslateModule,
    MybpmAddButtonModule,
    MatIconModule,
    FlexModule,
    InstanceTableModule,
    AdminItemPageModule,
    DragDropModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    EditDictValueModule
  ]
})
export class DictModule { }
