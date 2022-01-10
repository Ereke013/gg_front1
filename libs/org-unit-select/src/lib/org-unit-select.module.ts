import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrgUnitSelectComponent} from './org-unit-select.component';
import {PopoverModule} from '@finance.workspace/popover';
import {OrgUnitSelectSearchComponent} from './org-unit-select-search.component';
import {OrgUnitSelectService} from './org-unit-select.service';
import {MatIconModule} from '@angular/material/icon';
import {FlexModule} from '@angular/flex-layout';
import {TranslateModule} from '@ngx-translate/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MybpmLinkModule} from '@finance.workspace/mybpm-link';
import {HttpServiceModule} from '@finance.workspace/http-service';
import {UiChipModule} from '@finance.workspace/ui/chip';
import {UiRadioModule} from '@finance.workspace/ui/radio';

@NgModule({
  declarations: [OrgUnitSelectComponent, OrgUnitSelectSearchComponent],
  imports: [
    CommonModule,
    PopoverModule,
    MatIconModule,
    FlexModule,
    UiChipModule,
    TranslateModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    UiRadioModule,
    MybpmLinkModule,
    HttpServiceModule,
    FormsModule,
    MatIconModule,
    TranslateModule,
  ],
  exports: [
    OrgUnitSelectComponent,
    OrgUnitSelectSearchComponent,
  ],
  providers: [OrgUnitSelectService],
})
export class OrgUnitSelectModule {}
