import {ParameterType} from "./ParameterType";
import {Dict} from "@finance-web/models/dict/Dict";

export interface ProductParameterForFilter {
  id: number,
  hasChild: boolean,
  type: ParameterType,
  value: string,
  title: string,

  dictList: Dict[];

  // on client
  parentId: number,
  level: number,
}
