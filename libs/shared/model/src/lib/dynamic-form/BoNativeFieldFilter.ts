import {BoNativeFieldType, OrgUnitId} from '@finance.workspace/shared/model';
import {OrgUnitRecord} from '@finance.workspace/shared/model';

export interface BoNativeFieldFilter {
  id: string;
  type: BoNativeFieldType;
  dateFrom: Date|undefined;
  dateTo: Date|undefined;
  orgUnitRecords: OrgUnitRecord[];
  addOrgUnitIds: OrgUnitId[];
  delOrgUnitIds: OrgUnitId[];
}

export const BoNativeFieldFilterF = {

  create(id: string, type: BoNativeFieldType): BoNativeFieldFilter {
    return {
      id: id,
      type: type,
      dateTo: undefined,
      dateFrom: undefined,
      orgUnitRecords: [],
      addOrgUnitIds: [],
      delOrgUnitIds: [],
    };
  },
};
