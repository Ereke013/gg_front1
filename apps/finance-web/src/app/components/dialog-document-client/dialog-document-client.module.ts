import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogDocumentClientComponent } from './dialog-document-client.component';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';
import {TranslateModule} from "@ngx-translate/core";
import {DialogNewPledgeModule} from "@finance-web/app/components/dialog-new-pledge/dialog-new-pledge.module";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [DialogDocumentClientComponent],
  imports: [
    CommonModule,
    ImageCacheModule,
    MatIconModule,
    TranslateModule,
    DialogNewPledgeModule,
    MatInputModule
  ]
})
export class DialogDocumentClientModule {
}
