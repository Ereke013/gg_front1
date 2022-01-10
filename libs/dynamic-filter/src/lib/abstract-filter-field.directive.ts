import {Directive, Input} from '@angular/core';
import {DynamicFilterModel, DynamicFilterValue} from '@finance.workspace/shared/model';
import {DynamicFilterControl} from './DynamicFilterControl';

@Directive()
export abstract class AbstractFilterFieldDirective {
  @Input() ownerBoId: string;
  @Input() filter: DynamicFilterModel;
  @Input() filterControl: DynamicFilterControl;

  _changeValue(value: DynamicFilterValue) {
    this.filterControl._changeValue(this.filter.id, value);
  }

  abstract writeValue(value: DynamicFilterValue);
}
