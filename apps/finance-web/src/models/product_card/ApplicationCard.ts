import { Pledge } from '../pledge/Pledge';
import { FilterToProduct } from '@finance-web/models/all-filters/FilterToProduct';

export interface ApplicationCard {
  logo: string,
  title: string,
  documentList: string,
  clientInfoList: FilterToProduct[],
  pledgeInfoList: FilterToProduct[],
  pledgeList: Pledge[],
  calculationList: FilterToProduct[],
  displayableParamsList: FilterToProduct[],
  creditSum: string,
  creditTerm: string,
  initialFee?: string,
  isCooperation: boolean,
}
