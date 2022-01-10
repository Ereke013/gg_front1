import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAuthClientComponent } from './dialog-auth-client.component';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';
import {TranslateModule} from "@ngx-translate/core";
import {DialogNewPledgeModule} from "@finance-web/app/components/dialog-new-pledge/dialog-new-pledge.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {SignModule} from "@finance-web/app/pages/client/sign/sign.module";


@NgModule({
  declarations: [DialogAuthClientComponent],
    imports: [
        CommonModule,
        ImageCacheModule,
        MatIconModule,
        TranslateModule,
        DialogNewPledgeModule,
        ReactiveFormsModule,
        NgxMaskModule,
        SignModule
    ]
})
export class DialogAuthClientModule {
}
