import {BoFieldFilter, BoNativeFieldFilter, OrderState, Paging} from '@finance.workspace/shared/model';

export interface ApiBoiTableReq {

  boCode: string;
  headCodes?: string[];
  filters?: ApiBoiTableFilter[];
  dynamicFilters?: BoFieldFilter[];
  nativeFilters?: BoNativeFieldFilter[];
  paging?: Paging;
  orderState?: OrderState;
  orderingFieldCode?: string;

}

export interface ApiBoiTableFilter {

  fieldCode: string;
  refFieldCode?: string;
  value?: string;
  intFrom?: number;
  intTo?: number;
  dateFrom?: Date;
  dateTo?: Date;

}
