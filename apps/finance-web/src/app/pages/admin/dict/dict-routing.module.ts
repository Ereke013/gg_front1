import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DictComponent} from "@finance-web/app/pages/admin/dict/dict.component";

const routes: Routes = [
  {
    path: '',
    component: DictComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DictRoutingModule { }
