import { AllFilters } from '../all-filters/AllFilters';

export interface PledgeData {
  id: number,
  name: string,
  pledgeType: string,
  changeName: boolean,
  filters: AllFilters[];
}

export enum PledgeDataType {
  AUTO = 'pledgeAuto',
  PROPERTY = 'pledgeProperty',
}
