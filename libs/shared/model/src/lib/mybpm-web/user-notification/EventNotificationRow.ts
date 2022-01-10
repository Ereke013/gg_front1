import {EventNotificationType, OrgUnitRecord} from '@finance.workspace/shared/model';

export interface EventNotificationRow {
  id: string;
  type: EventNotificationType;
  createdAt: Date;
  oldDisplayValue: string;
  newDisplayValue: string;
  orgUnitRecords: OrgUnitRecord[];
  isRead: boolean;
}
