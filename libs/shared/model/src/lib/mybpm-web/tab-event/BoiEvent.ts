import {BoiEventType} from './BoiEventType';
import {OrgUnitRecord} from '@finance.workspace/shared/model';
import {BoiEventOldAndNewValues} from './BoiEventOldAndNewValues';

export interface BoiEvent {
  id: string;
  type: BoiEventType;
  happenedAt: Date;
  happenedAtStr: string;
  happenedBy: OrgUnitRecord;

  orgUnitRecords: OrgUnitRecord[];
  oldAndNewValues: BoiEventOldAndNewValues;

  // NoJava
  orgUnitRecordsUncover: boolean;
}
