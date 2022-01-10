import { Dict } from '@finance-web/models/dict/Dict';

export interface AllFilters {
  title: string;
  dict: string;
  type: string;
  value: string;
  values: Dict[];
}
