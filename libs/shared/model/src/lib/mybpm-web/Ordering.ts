import {BoFieldArchetype, OrderState} from '@finance.workspace/shared/model';

export interface Ordering {
  fieldId: string;
  state: OrderState;
  archetype: BoFieldArchetype;
}
