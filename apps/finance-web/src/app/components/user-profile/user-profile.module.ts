import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileBorrowerDataModule } from '@finance-web/app/components/profile-borrower-data/profile-borrower-data.module';
import { ProfilePledgeDataModule } from '@finance-web/app/components/profile-pledge-data/profile-pledge-data.module';
import { ProfileChangePasswordModule } from '@finance-web/app/components/profile-change-password/profile-change-password.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [UserProfileComponent],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ProfileBorrowerDataModule,
    ProfilePledgeDataModule,
    ProfileChangePasswordModule,
    TranslateModule
  ]
})
export class UserProfileModule { }
