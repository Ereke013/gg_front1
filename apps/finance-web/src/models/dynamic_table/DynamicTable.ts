import {DynamicTableHead} from "./DynamicTableHead";
import {DynamicTableRecord} from "@finance-web/models/dynamic_table/DynamicTableRecord";

export interface DynamicTable {
  heads: DynamicTableHead[];
  records: DynamicTableRecord[];
  hasNext: boolean;
}
