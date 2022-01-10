import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "@finance-web/providers/guards/auth.guard";
import {UserRole} from "@finance-web/models/client/UserRole";

const routes: Routes = [
  {
    path: 'client',
    loadChildren: () => import('@finance-web/app/pages/client/client.module').then(m => m.ClientModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('@finance-web/app/pages/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: {roles: [UserRole.FO_MANAGER, UserRole.NEWS_MANAGER, UserRole.APPLICATION_MANAGER, UserRole.ADMIN, UserRole.NEWS_MANAGER, UserRole.PRODUCT_MANAGER]}
  },
  {
    path: '',
    redirectTo: 'client',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
