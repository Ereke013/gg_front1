import {ChatNotificationRow} from '@finance.workspace/shared/model';

export interface ChatNotification {
  roomId: string;
  boId: string;
  name: string;
  lastNotification: ChatNotificationRow;
  count: number;
}
