import {DynamicFilterModel, DynamicFilterProperties, DynamicFilterValue} from '@finance.workspace/shared/model';
import {Subject} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {requireNonNull, StringKeyedMap} from '@finance.workspace/shared/util';
import {ChangeDetectorRef} from '@angular/core';
import {AbstractFilterFieldDirective} from './abstract-filter-field.directive';
import {DfConfig} from './DfConfig';

interface ValueChangeOutput {
  filterId: string,
  value: DynamicFilterValue;
}

export class DynamicFilterControl {

  public readonly value: { [fieldId: string]: DynamicFilterValue; } = {};

  private readonly valueChangedSubject = new Subject<ValueChangeOutput>();
  public readonly valueChanged$: Observable<ValueChangeOutput> = this.valueChangedSubject.asObservable();

  private readonly filterDeletedSubject = new Subject<string>();
  public readonly filterDeleted$: Observable<string> = this.filterDeletedSubject.asObservable();

  public readonly propertyMap = new StringKeyedMap<DynamicFilterProperties>();
  private readonly viewInstanceMap = new StringKeyedMap<AbstractFilterFieldDirective>();
  private cdr: ChangeDetectorRef;

  constructor(
    public readonly config: DfConfig,
  ) {
    this.fillPropertyMap();
  }

  _changeValue(filterId: string, value: DynamicFilterValue) {
    this.value[filterId] = value;
    this.propertyMap.get(filterId).text = value.toText();
    this.valueChangedSubject.next({ filterId, value });
  }

  _registerViewInstance(filterId: string, viewInstance: AbstractFilterFieldDirective) {
    this.viewInstanceMap.set(filterId, viewInstance);
  }

  _deregisterViewInstance(filterId: string) {
    this.viewInstanceMap.delete(filterId);
  }

  _registerCdr(cdr: ChangeDetectorRef) {
    this.cdr = cdr;
  }

  deleteFilter(filterId: string) {
    requireNonNull(filterId, 'filterId');
    for (let i = 0; i < this.config.filters.length; i++) {
      if (this.config.filters[i].id !== filterId) { continue; }
      this.config.filters.splice(i, 1);
    }
    this.propertyMap.delete(filterId);
    this.filterDeletedSubject.next(filterId);
    this.cdr.detectChanges();
  }

  addFilter(filter: DynamicFilterModel) {
    requireNonNull(filter, 'filter');
    this.config.filters.push(filter);
    this.propertyMap.set(filter.id, defaultFilterProperty(filter));
    this.cdr.detectChanges();
  }

  chipAll() {
    this.propertyMap.values().forEach(x => x.chipsMode = true);
    this.cdr.detectChanges();
  }

  unChip(filterId: string) {
    requireNonNull(filterId);
    this.propertyMap.get(filterId).chipsMode = false;
    this.cdr.detectChanges();
  }

  private fillPropertyMap() {
    for (const filter of this.config.filters) {
      const properties = defaultFilterProperty(filter);
      properties.chipsMode = true;
      this.propertyMap.set(filter.id, properties);
    }
  }
}

function defaultFilterProperty(filter: DynamicFilterModel): DynamicFilterProperties {
  return {
    chipsMode: false,
    text: filter.value.toText(),
  };
}
