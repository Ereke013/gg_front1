import {EventNotificationRow} from '@finance.workspace/shared/model';

export interface EventNotification {
  boiId: string;
  boId: string;
  name: string;
  lastNotification: EventNotificationRow;
  count: number;
}
