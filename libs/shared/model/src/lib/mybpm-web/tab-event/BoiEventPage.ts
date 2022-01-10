import {BoiEvent} from '@finance.workspace/shared/model';

export interface BoiEventPage {
  nextPageId: string;
  events: BoiEvent[];
}
