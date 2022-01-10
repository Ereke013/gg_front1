import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NavigationModule } from '../../components/navigation/navigation.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavigationModule } from '../../components/admin-navigation/admin-navigation.module';
import { ProductParametersModule } from './product-parameters/product-parameters.module';
import { ProductModule } from './product/product.module';
import { DictModule } from '@finance-web/app/pages/admin/dict/dict.module';
import { DeleteDialogWindowModule } from '@finance-web/app/components/delete-dialog-window/delete-dialog-window.module';
import { FilterModule } from '@finance-web/app/components/filter/filter.module';
import { InstanceTableModule } from '@finance-web/app/components/instance-table/instance-table.module';
import { EditProductModule } from '@finance-web/app/components/edit-product/edit-product.module';
import { ListPopoverModule } from '@finance-web/app/components/list-popover/list-popover.module';
import { ProductParameterSettingsModule } from '@finance-web/app/components/product-parameter-settings/product-parameter-settings.module';
import { EditDictModule } from '@finance-web/app/components/edit-dict/edit-dict.module';
import { EditDictValueModule } from '@finance-web/app/components/edit-dict-value/edit-dict-value.module';
import { AdminItemPageModule } from '@finance-web/app/components/admin-item-page/admin-item-page.module';
import { ParamTestPageModule } from '@finance-web/app/pages/admin/param-test-page/param-test-page.module';
import { BankContactsModule } from '@finance-web/app/pages/admin/bank-contacts/bank-contacts.module';
import { EditBankContactsModule } from '@finance-web/app/components/edit-bank-contacts/edit-bank-contacts.module';
import { ApplicationModule } from '@finance-web/app/pages/admin/application/application.module';
import { EditApplicationModule } from '@finance-web/app/components/edit-application/edit-application.module';
import { PledgeDataTabModule } from '@finance-web/app/components/pledge-data-tab/pledge-data-tab.module';
import { ReportModule } from '@finance-web/app/pages/admin/report/report.module';
import { CopyDialogWindowModule } from '@finance-web/app/components/copy-dialog-window/copy-dialog-window.module';
import { RolesModule } from '@finance-web/app/pages/admin/roles/roles.module';
import {DialogCreditHistoryModule} from "@finance-web/app/components/dialog-credit-history/dialog-credit-history.module";


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavigationModule,
    AdminNavigationModule,
    ProductParametersModule,
    ProductModule,
    DictModule,
    DeleteDialogWindowModule,
    FilterModule,
    InstanceTableModule,
    EditProductModule,
    ListPopoverModule,
    ProductParameterSettingsModule,
    EditDictModule,
    EditDictValueModule,
    AdminItemPageModule,
    ParamTestPageModule,
    BankContactsModule,
    EditBankContactsModule,
    EditApplicationModule,
    ApplicationModule,
    PledgeDataTabModule,
    ReportModule,
    CopyDialogWindowModule,
    RolesModule,
    DialogCreditHistoryModule
  ]
})
export class AdminModule {
}
