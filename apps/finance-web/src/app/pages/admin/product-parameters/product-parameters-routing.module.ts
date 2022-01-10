import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductParametersComponent} from "./product-parameters.component";

const routes: Routes = [
  {
    path: '',
    component: ProductParametersComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductParametersRoutingModule {
}
