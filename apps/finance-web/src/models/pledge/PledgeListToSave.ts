import { PledgeValue } from './PledgeValue';

export interface PledgeListToSave {
  pledgeValues: PledgeValue[],
  id: number,
  title: string,
  pledgeType: string,
}
