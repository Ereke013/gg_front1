import {TablePaging} from "./TablePaging";
import {TableOrdering} from "@finance-web/models/filter/TableOrdering";
import {FilterByParameter} from "@finance-web/models/filter/FilterByParameter";

export interface TableFilter {
  paging: TablePaging;
  search: string;
  additionalSearch? : FilterByParameter[];
  ordering: TableOrdering;
  onlyRemoved: boolean;
}
