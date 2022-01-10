import {DynamicFilterModel} from '@finance.workspace/shared/model';
import {Type} from '@angular/core';
import {AbstractFilterFieldDirective} from '@finance.workspace/dynamic-filter';

export interface DfConfig {
  ownerBoId: string;
  filters: DynamicFilterModel[];
  componentResolver: (model: DynamicFilterModel) => Promise<Type<AbstractFilterFieldDirective>>;
}
