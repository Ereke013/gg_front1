import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileChangePasswordComponent } from './profile-change-password.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [ProfileChangePasswordComponent],
  exports: [ProfileChangePasswordComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatIconModule
    ]
})
export class ProfileChangePasswordModule {
}
