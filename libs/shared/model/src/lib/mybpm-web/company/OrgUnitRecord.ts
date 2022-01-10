import {UserRecord} from '../UserRecord';
import {OrgUnitId} from './user-group/OrgUnitId';
import {OrgUnitType} from './user-group/OrgUnitType';

export interface OrgUnitRecord {
  id: string;
  type: OrgUnitType;
  name: string;
  avatar: string;
}

export const OrgUnitRecordF = {
  toUserRecord(x: OrgUnitRecord): UserRecord {
    return {
      id: x.id,
      fio: x.name,
      avatar: x.avatar,
    } as UserRecord;
  },

  toOrgUnitId(x: OrgUnitRecord): OrgUnitId {
    return {
      id: x.id,
      type: x.type,
    };
  },
};
