import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from '@finance-web/app/pages/client/profile/profile-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProfileBorrowerDataModule } from '@finance-web/app/components/profile-borrower-data/profile-borrower-data.module';
import { MatSelectModule } from '@angular/material/select';
import { ProfilePledgeDataModule } from '@finance-web/app/components/profile-pledge-data/profile-pledge-data.module';
import { ProfileChangePasswordModule } from '@finance-web/app/components/profile-change-password/profile-change-password.module';
import { UserProfileModule } from '@finance-web/app/components/user-profile/user-profile.module';
import { CreditHistoryModule } from '@finance-web/app/components/credit-history/credit-history.module';
import { FavoritesModule } from '@finance-web/app/components/favorites/favorites.module';
import { ProfileApplicationsModule } from '@finance-web/app/components/profile-applications/profile-applications.module';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    TranslateModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ProfileBorrowerDataModule,
    MatSelectModule,
    ProfilePledgeDataModule,
    ProfileChangePasswordModule,
    UserProfileModule,
    CreditHistoryModule,
    FavoritesModule,
    ProfileApplicationsModule
  ]
})
export class ProfileModule {
}
