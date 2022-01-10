import {OrgNodeRecord} from './company/OrgNodeRecord';
import {OrgUnitRecord} from './company/OrgUnitRecord';
import {TreeOrgNodeType} from './company/TreeOrgNodeType';
import {OrgUnitId} from './company/user-group/OrgUnitId';
import {OrgUnitType} from './company/user-group/OrgUnitType';

export interface UserRecord {
  id: string;
  fio: string;
  avatar?: string;
  active: boolean;
}

export class UserRecordF {
  public static toOrgUnitId(x: UserRecord): OrgUnitId {
    return {
      id: x.id,
      type: OrgUnitType.PERSON,
    };
  }

  public static toOrganizationNode(x: UserRecord): OrgNodeRecord {
    return {
      id: x.id,
      type: TreeOrgNodeType.PERSON,
      name: x.fio,
      active: x.active,
      expandable: undefined,
    };
  }

  public static toOrgUnitRecord(x: UserRecord): OrgUnitRecord {
    return {
      id: x.id,
      name: x.fio,
      type: OrgUnitType.PERSON,
      avatar: x.avatar,
    };
  }

  public static toOrgUnitRecords(x: UserRecord[]): OrgUnitRecord[] {
    return x.map(rec => this.toOrgUnitRecord(rec));
  }
}
