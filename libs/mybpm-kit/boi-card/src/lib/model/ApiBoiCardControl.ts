import {requireNonNull} from '@finance.workspace/shared/util';
import {BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/internal/Observable';
import {BoiDialogType, FormField} from '@finance.workspace/shared/model';
import {Type} from '@angular/core';
import {AbstractDffDirective, DfControl} from '@finance.workspace/dynamic-form';

export interface ApiBoiCardConfig {
  code: string;
  viewType: BoiDialogType;
  dffResolver: (formField: FormField) => Promise<Type<AbstractDffDirective<FormField>>>
  boiId?: string;
  fieldCodes?: string[];
  forFieldId?: string;
}

export class ApiBoiCardControl {

  private readonly codeSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private readonly boiIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  private readonly viewTypeSubject: BehaviorSubject<BoiDialogType> = new BehaviorSubject<BoiDialogType>(undefined);
  private readonly afterDfControlSetFns: ((dfControl: DfControl<FormField>) => void)[] = [];

  public readonly code$: Observable<string> = this.codeSubject.asObservable();
  public readonly boiId$: Observable<string> = this.boiIdSubject.asObservable();
  public readonly viewType$: Observable<BoiDialogType> = this.viewTypeSubject.asObservable();
  public readonly dffResolver: (formField: FormField) => Promise<Type<AbstractDffDirective<FormField>>>;
  public readonly fieldCodes: string[];
  public readonly forFieldId: string;

  constructor(
    config: ApiBoiCardConfig,
  ) {
    requireNonNull(config, 'Zg6ZdF4r');
    requireNonNull(config.code, 'eHYQYe4m');
    requireNonNull(config.viewType, 'ycQoSQC3');
    requireNonNull(config.dffResolver, '23g34dwf');
    this.codeSubject.next(config.code);
    this.boiIdSubject.next(config.boiId);
    this.viewTypeSubject.next(config.viewType);
    this.dffResolver = config.dffResolver;
    this.fieldCodes = config.fieldCodes;
    this.forFieldId = config.forFieldId;
  }

  registerAfterDfControlSetFn(fn: (dfControl: DfControl<FormField>) => void) {
    this.afterDfControlSetFns.push(fn);
  }

  _afterDfControlSet(dfControl: DfControl<FormField>) {
    this.afterDfControlSetFns.forEach(x => x(dfControl));
  }

}
