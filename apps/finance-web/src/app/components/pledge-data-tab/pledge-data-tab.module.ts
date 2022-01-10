import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PledgeDataTabComponent } from './pledge-data-tab.component';
import { DynamicFormFieldsModule } from '@finance-web/app/dynamic-form-fields/dynamic-form-fields.module';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';


@NgModule({
  declarations: [PledgeDataTabComponent],
  exports: [
    PledgeDataTabComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TranslateModule,
    MatCheckboxModule,
    DynamicFormFieldsModule,
    ImageCacheModule
  ]
})
export class PledgeDataTabModule {
}
