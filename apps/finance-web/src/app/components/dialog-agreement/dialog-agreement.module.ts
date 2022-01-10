import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogAgreementComponent} from './dialog-agreement.component';
import {ImageCacheModule} from '@finance-web/directives/image-cache.module';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from "@ngx-translate/core";
import {DialogNewPledgeModule} from "@finance-web/app/components/dialog-new-pledge/dialog-new-pledge.module";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [DialogAgreementComponent],
  imports: [
    CommonModule,
    ImageCacheModule,
    MatIconModule,
    TranslateModule,
    DialogNewPledgeModule,
    MatInputModule
  ]
})
export class DialogAgreementModule {
}
