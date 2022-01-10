import { FilterToProduct } from './FilterToProduct';
import { TablePaging } from '@finance-web/models/filter/TablePaging';
import { SortingParameter } from '@finance-web/models/all-filters/SortingParameter';

export interface FilterList {
  filters: FilterToProduct[];
  paging?: TablePaging;
  ordering?: SortingParameter;
  tabName?: string;
  city?: string;
  isFavorite?: boolean;
}
