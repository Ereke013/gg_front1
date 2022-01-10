import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParamTestPageComponent} from "./param-test-page.component";

const routes: Routes = [
  {
    path: '',
    component: ParamTestPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ParamTestPageRoutingModule {
}
