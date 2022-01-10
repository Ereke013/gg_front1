import {TreeOrgNodeType} from './TreeOrgNodeType';


export interface OrgNodeRecord {
  id: string;
  name: string;
  type: TreeOrgNodeType;
  active: boolean;
  expandable: boolean;
}
