import { BankBranch } from './BankBranch';

export interface BankProductToShow {
  title: string;
  logo: string;
  branches: BankBranch[];
}
