import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationCardComponent} from './application-card.component';
import {MatIconModule} from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {ImageCacheModule} from '@finance-web/directives/image-cache.module';
import {MatMenuModule} from "@angular/material/menu";
import {RepaymentScheduleModule} from "@finance-web/app/components/repayment-schedule/repayment-schedule.module";
import {DialogPledgeClientModule} from "@finance-web/app/components/dialog-pledge-client/dialog-pledge-client.module";
import {DialogDocumentClientModule} from "@finance-web/app/components/dialog-document-client/dialog-document-client.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DialogAuthClientModule} from "@finance-web/app/components/dialog-auth-client/dialog-auth-client.module";
import {DialogAgreementModule} from "@finance-web/app/components/dialog-agreement/dialog-agreement.module";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [ApplicationCardComponent],
  exports: [ApplicationCardComponent],
    imports: [
        CommonModule,
        MatIconModule,
        TranslateModule,
        MatButtonModule,
        MatSliderModule,
        MatSelectModule,
        FormsModule,
        NgxMaskModule,
        ImageCacheModule,
        MatMenuModule,
        RepaymentScheduleModule,
        DialogPledgeClientModule,
        DialogDocumentClientModule,
        MatProgressSpinnerModule,
        DialogAuthClientModule,
        DialogAgreementModule,
        MatTooltipModule
    ]
})
export class ApplicationCardModule {
}
