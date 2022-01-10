import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRolesComponent } from './edit-roles.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [EditRolesComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    NgxMaskModule
  ]
})
export class EditRolesModule { }
