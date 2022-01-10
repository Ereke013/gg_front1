import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserNotificationComponent} from './user-notification.component';
import {ExpansionPanelModule} from '@finance.workspace/expansion-panel';
import {UserNotificationButtonSetComponent} from './_components/user-notification-button-set.component';
import {UserNotificationChatBlockContentComponent} from './_components/user-notification-chat-block-content.component';

@NgModule({
  imports: [
    CommonModule,
    ExpansionPanelModule,
  ],
  declarations: [
    UserNotificationComponent,
    UserNotificationButtonSetComponent,
    UserNotificationChatBlockContentComponent,
  ],
  exports: [
    UserNotificationComponent,
  ],
})
export class MybpmKitUserNotificationModule {}
