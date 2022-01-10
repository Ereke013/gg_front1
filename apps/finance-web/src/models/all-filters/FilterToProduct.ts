import { ParameterType } from '@finance-web/models/product/ParameterType';

export interface FilterToProduct {
  title: string;
  value: string;

  type?: ParameterType;
  index?: number;
}
