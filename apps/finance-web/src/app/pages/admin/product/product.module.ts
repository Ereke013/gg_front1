import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from "./product.component";
import {ProductRoutingModule} from "./product-routing.module";
import {DynamicFormModule} from "@finance.workspace/dynamic-form";
import {PopoverModule} from "@finance.workspace/popover";
import {MybpmAddButtonModule} from "@finance-web/shared/add-button/mybpm-add-button.module";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {FlexModule} from "@angular/flex-layout";
import {FilterModule} from "@finance-web/app/components/filter/filter.module";
import {InstanceTableModule} from "@finance-web/app/components/instance-table/instance-table.module";
import {MdePopoverModule} from "@material-extended/mde";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ListPopoverModule} from "@finance-web/app/components/list-popover/list-popover.module";
import {AdminItemPageModule} from "@finance-web/app/components/admin-item-page/admin-item-page.module";



@NgModule({
  declarations: [ProductComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        DynamicFormModule,
        PopoverModule,
        MybpmAddButtonModule,
        MatIconModule,
        TranslateModule,
        FlexModule,
        FilterModule,
        InstanceTableModule,
        MdePopoverModule,
        MatCardModule,
        MatButtonModule,
        ListPopoverModule,
        AdminItemPageModule
    ]
})
export class ProductModule { }
