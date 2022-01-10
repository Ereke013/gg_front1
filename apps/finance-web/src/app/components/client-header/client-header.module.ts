import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientHeaderComponent} from './client-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { MdePopoverModule } from '@material-extended/mde';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [ClientHeaderComponent],
  exports: [
    ClientHeaderComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule,
    MatMenuModule,
    MdePopoverModule,
    MatCardModule
  ]
})
export class ClientHeaderModule {
}
