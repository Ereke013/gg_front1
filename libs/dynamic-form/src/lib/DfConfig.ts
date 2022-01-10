import {Injector, Type} from '@angular/core';
import {AbstractDffDirective, DffAsyncValidator, DffValidator, DffValue, GridPosition} from '..';

export interface DfConfig<T> {
  fields: T[];
  dffComponentResolver: (field: T) => Promise<Type<AbstractDffDirective<T>>>;
  dffValueF: (field: T, value: string) => DffValue;
  validatorF: (field: T) => DffValidator[];
  asyncValidatorF: (field: T) => DffAsyncValidator[];

  injector?: Injector;
  idF?: (field: T) => string;
  valueF?: (field: T) => string;
  gridPositionF?: (field: T) => GridPosition;
  hideF?: (field: T) => boolean;
  needGridSort?: boolean;
}
