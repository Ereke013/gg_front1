import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryComponent } from './recovery.component';
import { RecoveryRoutingModule } from './recovery-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {NgxMaskModule} from "ngx-mask";
import {MatIconModule} from "@angular/material/icon";
import {SignModule} from "../sign/sign.module";

@NgModule({
  declarations: [
    RecoveryComponent
  ],
  imports: [
    CommonModule,
    RecoveryRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxMaskModule,
    MatIconModule,
    SignModule
  ]
})
export class RecoveryModule {
}
