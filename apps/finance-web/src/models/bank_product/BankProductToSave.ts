import { BankBranch } from '@finance-web/models/bank_product/BankBranch';

export interface BankProductToSave {
  bankCode: string;
  title: string;
  siteUrl: string;
  logo: string;
  isCooperation: boolean;
  branches: BankBranch[];
}
