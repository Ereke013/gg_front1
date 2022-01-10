import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBankContactsComponent } from './dialog-bank-contacts.component';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DialogBankContactsComponent],
  imports: [
    CommonModule,
    ImageCacheModule,
    MatIconModule
  ]
})
export class DialogBankContactsModule {
}
