import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePledgeDataComponent } from './profile-pledge-data.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProfilePledgeDataComponent],
  exports: [ProfilePledgeDataComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    TranslateModule,
    FormsModule
  ]
})
export class ProfilePledgeDataModule {
}
