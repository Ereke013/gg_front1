import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepaymentScheduleComponent } from './repayment-schedule.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { ImageCacheModule } from '@finance-web/directives/image-cache.module';
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [RepaymentScheduleComponent],
  exports: [RepaymentScheduleComponent],
    imports: [
        CommonModule,
        MatIconModule,
        TranslateModule,
        MatButtonModule,
        MatSliderModule,
        MatSelectModule,
        FormsModule,
        NgxMaskModule,
        ImageCacheModule,
        MatMenuModule
    ]
})
export class RepaymentScheduleModule { }
