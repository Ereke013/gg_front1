import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';
import {AuthGuard} from '@finance-web/providers/guards/auth.guard';
import {UserRole} from '@finance-web/models/client/UserRole';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      {
        path: 'credit-selection',
        loadChildren: () => import('@finance-web/app/pages/client/credit-selection/credit-selection.module').then(m => m.CreditSelectionModule)
      },
      {
        path: 'login',
        loadChildren: () => import('@finance-web/app/pages/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('@finance-web/app/pages/client/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard],
        data: {roles: [UserRole.AUTHORIZED_CLIENT, UserRole.IDENTIFIED_CLIENT, UserRole.ADMIN,
            UserRole.FO_MANAGER, UserRole.NEWS_MANAGER, UserRole.APPLICATION_MANAGER, UserRole.NEWS_MANAGER, UserRole.PRODUCT_MANAGER]}
      },
      {
        path: 'registration',
        loadChildren: () => import('@finance-web/app/pages/client/registration/registration.module').then(m => m.RegistrationModule)
      },
      {
        path: 'recovery',
        loadChildren: () => import('@finance-web/app/pages/client/recovery/recovery.module').then(m => m.RecoveryModule)
      },
      {
        path: 'news',
        loadChildren: () => import('@finance-web/app/pages/client/news-abstract/news-abstract.module').then(m => m.NewsAbstractModule)
      },
      {
        path: '',
        redirectTo: 'credit-selection',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientRoutingModule {
}
