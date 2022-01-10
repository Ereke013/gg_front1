import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminAccessGuard} from "@finance-web/providers/guards/admin-access.guard";
import {UserRole} from "@finance-web/models/client/UserRole";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'product-parameters',
        loadChildren: () => import('@finance-web/app/pages/admin/product-parameters/product-parameters.module').then(m => m.ProductParametersModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN, UserRole.PRODUCT_MANAGER]}
      },
      {
        path: 'product',
        loadChildren: () => import('@finance-web/app/pages/admin/product/product.module').then(m => m.ProductModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN, UserRole.PRODUCT_MANAGER, UserRole.APPLICATION_MANAGER, UserRole.FO_MANAGER]}
      },
      {
        path: 'dict',
        loadChildren: () => import('@finance-web/app/pages/admin/dict/dict.module').then(m => m.DictModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN, UserRole.PRODUCT_MANAGER]}
      },
      // {
      //   path: 'param_test',
      //   loadChildren: () => import('@finance-web/app/pages/admin/param-test-page/param-test-page.module').then(m => m.ParamTestPageModule),
      // },
      {
        path: 'bank-contacts',
        loadChildren: () => import('@finance-web/app/pages/admin/bank-contacts/bank-contacts.module').then(m => m.BankContactsModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN]}
      },
      {
        path: 'application',
        loadChildren: () => import('@finance-web/app/pages/admin/application/application.module').then(m => m.ApplicationModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN, UserRole.APPLICATION_MANAGER, UserRole.FO_MANAGER]}
      },
      {
        path: 'report',
        loadChildren: () => import('@finance-web/app/pages/admin/report/report.module').then(m => m.ReportModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN, UserRole.FO_MANAGER]}
      },
      {
        path: 'roles',
        loadChildren: () => import('@finance-web/app/pages/admin/roles/roles.module').then(m => m.RolesModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN]}
      },
      {
        path: 'news-admin',
        loadChildren: () => import('@finance-web/app/pages/admin/news/news.module').then(m => m.NewsModule),
        canActivate: [AdminAccessGuard],
        data: {roles: [UserRole.ADMIN, UserRole.NEWS_MANAGER]}
      },
      {
        path: '',
        redirectTo: 'product',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminRoutingModule {
}
