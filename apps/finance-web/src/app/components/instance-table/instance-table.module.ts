import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InstanceTableComponent} from "./instance-table.component";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";
import {ClickUtilModule} from "@finance.workspace/click-util";
import {BoService} from "@finance-web/services/business-objects.service";
import {MdePopoverModule} from "@material-extended/mde";
import {ListPopoverModule} from "@finance-web/app/components/list-popover/list-popover.module";


@NgModule({
  declarations: [InstanceTableComponent],
  exports: [
    InstanceTableComponent
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    ClickUtilModule,
    MdePopoverModule,
    ListPopoverModule,
  ],
  providers:[BoService]
})
export class InstanceTableModule { }
