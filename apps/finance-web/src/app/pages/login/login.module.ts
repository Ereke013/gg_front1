import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from "@angular/material/icon";
import {SignModule} from "@finance-web/app/pages/client/sign/sign.module";

@NgModule({
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    SignModule
  ]
})
export class LoginModule {
}
