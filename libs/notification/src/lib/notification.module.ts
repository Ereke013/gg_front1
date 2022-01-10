import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationBodyComponent} from './notification-body.component';
import {NotificationService} from './notification.service';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [NotificationBodyComponent],
  imports: [CommonModule, TranslateModule, MatIconModule, MatSnackBarModule],
  providers: [NotificationService],
})
export class NotificationModule {}
