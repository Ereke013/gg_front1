import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductParametersComponent} from "./product-parameters.component";
import {ProductParametersRoutingModule} from "./product-parameters-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {EditProductParametersModule} from "@finance-web/app/components/edit-product-parameters/edit-product-parameters.module";
import {MybpmKitBoiTableModule} from "@finance.workspace/mybpm-kit/boi-table";
import {MybpmAddButtonModule} from "@finance-web/shared/add-button/mybpm-add-button.module";
import {FilterModule} from "@finance-web/app/components/filter/filter.module";
import {InstanceTableModule} from "@finance-web/app/components/instance-table/instance-table.module";
import {FlexModule} from "@angular/flex-layout";
import {TranslateModule} from "@ngx-translate/core";
import {AdminItemPageModule} from "@finance-web/app/components/admin-item-page/admin-item-page.module";


@NgModule({
  declarations: [ProductParametersComponent],
    imports: [
        CommonModule,
        ProductParametersRoutingModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        EditProductParametersModule,
        MybpmKitBoiTableModule,
        MybpmAddButtonModule,
        FilterModule,
        InstanceTableModule,
        FlexModule,
        TranslateModule,
        AdminItemPageModule,
    ]
})
export class ProductParametersModule { }
