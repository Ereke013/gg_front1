import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogChangeLocationComponent} from './dialog-change-location.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [DialogChangeLocationComponent],
  exports: [
    DialogChangeLocationComponent,
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        TranslateModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonModule,
    ]
})
export class DialogChangeLocationModule {
}
