import {TreeOrgNodeType} from './TreeOrgNodeType';
import {LazyFlatNode} from './LazyFlatNode';


export class TreeOrgNodeId {
  id: string;
  type: TreeOrgNodeType;

  constructor() {
  }

  public static of(node: LazyFlatNode) {
    const ret = new TreeOrgNodeId();
    ret.id = node.id;
    ret.type = node.type;
    return ret;
  }

  public static from(id: string, type: TreeOrgNodeType) {
    const ret = new TreeOrgNodeId();
    ret.id = id;
    ret.type = type;
    return ret;
  }
}
