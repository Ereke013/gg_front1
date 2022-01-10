import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminItemPageComponent} from "@finance-web/app/components/admin-item-page/admin-item-page.component";
import {MybpmAddButtonModule} from "@finance-web/shared/add-button/mybpm-add-button.module";
import {MatIconModule} from "@angular/material/icon";
import {MdePopoverModule} from "@material-extended/mde";
import {FlexModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";
import {ListPopoverModule} from "@finance-web/app/components/list-popover/list-popover.module";
import {FilterModule} from "@finance-web/app/components/filter/filter.module";
import {InstanceTableModule} from "@finance-web/app/components/instance-table/instance-table.module";



@NgModule({
  declarations: [AdminItemPageComponent],
  exports: [
    AdminItemPageComponent
  ],
  imports: [
    CommonModule,
    MybpmAddButtonModule,
    MatIconModule,
    MdePopoverModule,
    FlexModule,
    TranslateModule,
    ListPopoverModule,
    FilterModule,
    InstanceTableModule
  ]
})
export class AdminItemPageModule { }
