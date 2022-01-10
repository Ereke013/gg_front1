import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { ClientFooterComponent } from './client-footer.component';


@NgModule({
  declarations: [ClientFooterComponent],
  exports: [
    ClientFooterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule
  ]
})
export class ClientFooterModule {
}
