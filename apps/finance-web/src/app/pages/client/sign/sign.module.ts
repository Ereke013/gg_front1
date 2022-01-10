import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { SignRoutingModule } from './sign-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {MatIconModule} from "@angular/material/icon";
import {NgxMaskModule} from "ngx-mask";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {TimeFormatPipe} from "@finance-web/app/pipe/TimeFormatPipe";

@NgModule({
    declarations: [
        SignComponent,
        TimeFormatPipe
    ],
    exports: [
        SignComponent,
        TimeFormatPipe
    ],
  imports: [
    CommonModule,
    SignRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    NgxMaskModule,
    MatCheckboxModule,
    FormsModule
  ]
})
export class SignModule {
}
