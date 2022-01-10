import {ParameterType} from "@finance-web/models/product/ParameterType";

export interface ProductParameterToSave {
  id: number;
  displayTitleEn: string;
  displayTitleRu: string;
  displayTitleKk: string;
  tableName: string;
  type: ParameterType;
  dictTable: string;

  showAsHeader: boolean;
  isFilter: boolean;
  isSorting: boolean;

  isSubParameter: boolean;
  parameterRef: number;
  dictCodeColumn: string;

  filterType: string;
}
