import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {ClientCreditSelectionComponent} from './client-credit-selection.component';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {AllFiltersModule} from '@finance-web/app/components/all-filters/all-filters.module';
import {CurrencyPipe} from "@finance-web/app/pipe/CurrencyPipe";
import {NgxMaskModule} from "ngx-mask";


@NgModule({
  declarations: [ClientCreditSelectionComponent, CurrencyPipe],
  exports: [
    ClientCreditSelectionComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslateModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    AllFiltersModule,
    NgxMaskModule
  ]
})
export class ClientCreditSelectionModule {
}
