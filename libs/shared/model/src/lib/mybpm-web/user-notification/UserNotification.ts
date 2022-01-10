import {ChatNotification} from './ChatNotification';
import {EventNotification} from './EventNotification';
import {UserNotificationType} from './UserNotificationType';

export interface UserNotification {
  eventNotification: EventNotification;
  chatNotification: ChatNotification;
  type: UserNotificationType;
  userId: string;
}