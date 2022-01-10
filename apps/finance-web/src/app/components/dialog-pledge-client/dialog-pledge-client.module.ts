import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogPledgeClientComponent } from './dialog-pledge-client.component';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';
import {TranslateModule} from "@ngx-translate/core";
import {DialogNewPledgeModule} from "@finance-web/app/components/dialog-new-pledge/dialog-new-pledge.module";


@NgModule({
  declarations: [DialogPledgeClientComponent],
  imports: [
    CommonModule,
    ImageCacheModule,
    MatIconModule,
    TranslateModule,
    DialogNewPledgeModule
  ]
})
export class DialogPledgeClientModule {
}
