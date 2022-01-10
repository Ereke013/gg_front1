import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {NgxMaskModule} from "ngx-mask";
import {MatIconModule} from "@angular/material/icon";
import {SignModule} from "../sign/sign.module";

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskModule,
    MatIconModule,
    SignModule
  ]
})
export class RegistrationModule {
}
