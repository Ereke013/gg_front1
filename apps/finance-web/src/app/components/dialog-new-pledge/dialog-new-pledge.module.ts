import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogNewPledgeComponent } from './dialog-new-pledge.component';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [DialogNewPledgeComponent],
  imports: [
    CommonModule,
    ImageCacheModule,
    MatIconModule,
    TranslateModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class DialogNewPledgeModule {
}
