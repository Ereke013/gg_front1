import { ProductValue } from '@finance-web/models/product/ProductValue';

export interface ProductCard {
  id: number,
  values: ProductValue[],
  isFavorite: boolean,
  title: string,
  bankCode: string,
  logo: string,
  sumOfCredit?: string,
  termOfCredit?: string
  initialFee?: string
}
