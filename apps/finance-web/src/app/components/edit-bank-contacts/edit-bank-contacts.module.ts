import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBankContactsComponent } from './edit-bank-contacts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ConsumerCreditModule } from '@finance-web/app/components/consumer-credit/consumer-credit.module';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [EditBankContactsComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        TranslateModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        ConsumerCreditModule,
        ImageCacheModule,
        MatIconModule,
        MatCheckboxModule
    ]
})
export class EditBankContactsModule { }
