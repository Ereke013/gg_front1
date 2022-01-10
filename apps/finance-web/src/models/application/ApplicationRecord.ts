import { Product } from '../product/Product';

export interface ApplicationRecord {
  id: number;
  productId: number;
  clientId: number;
  amountOfCredit: number;
  creditTerm: number;
  totalCosts: number;
  issuanceCosts: number;
  overpayment: number;
  issuanceCommission: number;
  commissionForConsideration: number;
  monthlyPayment: number;
  bankLogo: string;
  bankCode: string;
  productTitle: string;
  typeOfPledge: string;
  date: Date;
  productDetail: Product;
  initialFee?: number;
}
