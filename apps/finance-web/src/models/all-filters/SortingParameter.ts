import { OrderState } from '@finance.workspace/shared/model';
import { ParameterType } from '@finance-web/models/product/ParameterType';

export interface SortingParameter {
  name: string;
  code: string;
  ordering: OrderState;
  type: ParameterType;
}
