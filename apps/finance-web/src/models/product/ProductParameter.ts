import { ParameterType } from '@finance-web/models/product/ParameterType';
import { Dict } from '@finance-web/models/dict/Dict';

export interface ProductParameter {
  parameterId: number,
  parameterType: ParameterType;
  displayTitle: string,
  paramValue: string,
  filterType: string,
  isDisplayable: boolean,
  isVisibleToFo: boolean,
  isDisplayableInApplicationCard: boolean,

  dictList: Dict[],
  prefixDictList?: Dict[],
  parentId: number,

  //only client
  level: number,

}
