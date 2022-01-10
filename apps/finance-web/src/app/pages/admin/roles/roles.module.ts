import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from '@finance-web/app/pages/admin/roles/roles-routing.module';
import { AdminItemPageModule } from '@finance-web/app/components/admin-item-page/admin-item-page.module';
import { EditRolesModule } from '@finance-web/app/components/edit-roles/edit-roles.module';

@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    AdminItemPageModule,
    EditRolesModule
  ]
})
export class RolesModule { }
