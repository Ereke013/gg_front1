import {TreeOrgNodeId} from './TreeOrgNodeId';
import {TreeOrgNodeType} from './TreeOrgNodeType';


export interface LazyFlatNode {
  id: string;
  name: string;
  expandable: boolean;
  level: number;
  active: boolean;
  isLoading: boolean;
  isSelected: boolean;
  type: TreeOrgNodeType;
}

export const LazyFlatNodeF = {
  toOrgNodeId(x: LazyFlatNode): TreeOrgNodeId {
    return TreeOrgNodeId.from(x.id, x.type);
  },
};
