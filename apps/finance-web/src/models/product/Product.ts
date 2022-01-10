import {ProductParameter} from "@finance-web/models/product/ProductParameter";

export interface Product {
  id: number,
  parameters: ProductParameter[],
  displayTitleEn: string,
  displayTitleRu: string,
  displayTitleKk: string,
  code?: string
}
