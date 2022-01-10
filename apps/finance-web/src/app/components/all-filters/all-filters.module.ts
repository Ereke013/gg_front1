import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { AllFiltersComponent } from './all-filters.component';
import { MatSelectModule } from '@angular/material/select';
import { ComboBoxModule } from '@finance-web/app/components/combo-box/combo-box.module';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [AllFiltersComponent],
  exports: [
    AllFiltersComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        TranslateModule,
        MatIconModule,
        MatSelectModule,
        ComboBoxModule,
        MatSlideToggleModule,
        FormsModule,
        MatTooltipModule
    ]
})
export class AllFiltersModule {
}
