import {AbstractDffDirective, DfControl, DffAsyncValidator, DffValidator, DffValue} from '..';
import {requireNonNull} from '@finance.workspace/shared/util';
import {forkJoin, Subject} from 'rxjs';
import {debounceTime, map, switchMap, take, tap} from 'rxjs/operators';
import {ElementRef} from '@angular/core';

export class DffControl<T> {
  public touched = false;
  public pending = false;
  public readonly raw: T;

  private view: AbstractDffDirective<T>;
  private value: DffValue;
  private errors: string[] = [];
  private readonly asyncValidatorsSubject: Subject<DffValue>;
  private readonly dfc: DfControl<T>;
  private readonly validators: DffValidator[];
  private readonly asyncValidators: DffAsyncValidator[];

  constructor(
    dfc: DfControl<T>,
    field: T,
    value: DffValue,
    validators: DffValidator[],
    asyncValidators: DffAsyncValidator[],
  ) {
    requireNonNull(value, 'cFdr3we4s');
    requireNonNull(validators, 'SMACpERt');
    this.dfc = dfc;
    this.raw = field;
    this.value = value;
    this.validators = validators;
    this.asyncValidators = asyncValidators;
    this.asyncValidatorsSubject = asyncValidators && asyncValidators.length > 0 ? new Subject<DffValue>() : undefined;
    this.subToAsyncValidatorsSubject();
    this.runValidators();
  }

  set viewRef(viewRef: AbstractDffDirective<T>) {
    this.view = viewRef;
    this.view.writeValue0(this.value);
  }

  get elRef(): ElementRef {
    return this.view.elementRef;
  }

  get isValid(): boolean {
    if (this.pending) return false;
    return this.errors.length === 0;
  }

  getErrors() {
    return this.errors;
  }

  getValue(): DffValue {
    return this.value;
  }

  setValue(value: DffValue, { runValidators }: { runValidators: boolean } = { runValidators: true }) {
    this.value = value;

    this.view?.touch();
    this.view?.writeValue0(value);

    if (runValidators) {
      this.runValidators();
    } else {
      this.errors = [];
      this.dfc.reduceValidStatus();
    }
  }

  reset() {
    this.value = undefined;
    this.view?.writeValue0(undefined);
    this.touched = false;
    this.runValidators();
  }

  touch() {
    if (this.touched) {
      return;
    }
    this.touched = true;
  }

  scrollToElement() {
    this.view?.scrollToElement();
  }

  changeValue(val: DffValue) {
    this.value = val;
    this.dfc.changeValue(this.raw, val);
    this.runValidators();
  }

  changeFocused(focused: boolean) {
    this.dfc.changeFocus(this.raw, focused);
  }

  private runValidators() {
    this.errors = [];
    for (const validator of this.validators) {
      const error = validator.validate(this.value);
      if (error) this.errors.push(error);
    }
    this.dfc.reduceValidStatus();
    this.asyncValidatorsSubject?.next(this.value);
  }

  private subToAsyncValidatorsSubject() {
    if (!this.asyncValidatorsSubject) {
      return;
    }

    this.asyncValidatorsSubject.asObservable().pipe(
      tap(() => this.pending = true),
      debounceTime(500),
      switchMap(val => forkJoin(this.asyncValidators.map(x => x.validate(val).pipe(take(1))))),
      tap(() => this.pending = false),
      map(arr => arr.filter(x => !!x)),
      tap(arr => this.errors = [...this.errors, ...arr]),
      tap(() => this.dfc.reduceValidStatus()),
    ).subscribe();
  }
}
