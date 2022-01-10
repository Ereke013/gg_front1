import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditApplicationComponent } from './edit-application.component';
import { MatTabsModule } from '@angular/material/tabs';
import { PledgeDataTabModule } from '@finance-web/app/components/pledge-data-tab/pledge-data-tab.module';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [EditApplicationComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        TranslateModule,
        MatInputModule,
        MatButtonModule,
        MatTabsModule,
        PledgeDataTabModule,
        MatSelectModule,
        MatIconModule
    ]
})
export class EditApplicationModule {
}
