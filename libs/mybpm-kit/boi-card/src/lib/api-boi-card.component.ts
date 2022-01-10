import {ChangeDetectorRef, Component, Injector, Input, OnDestroy} from '@angular/core';
import {safeObserve, shareResult, StringKeyedMap, SubSink} from '@finance.workspace/shared/util';
import {ApiBoiCardControl} from './model/ApiBoiCardControl';
import {combineLatest, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {
  BoFieldType,
  BoInstance,
  BusinessObjectDetails,
  createValidators,
  DffValueF,
  FormField,
} from '@finance.workspace/shared/model';
import {DfControl, DffAsyncValidator, DffValue} from '@finance.workspace/dynamic-form';
import {LibBoController, LibBoiController} from '@finance.workspace/mybpm-kit/controller';
import {ApiBoiCardContext} from './model/ApiBoiCardContext';

@Component({
  selector: 'mb-api-boi-card',
  templateUrl: './api-boi-card.component.html',
  styleUrls: ['./api-boi-card.component.scss'],
})
export class ApiBoiCardComponent implements OnDestroy {

  //region @Input control: ApiBoiCardControl;
  private _control!: ApiBoiCardControl;

  get control(): ApiBoiCardControl {
    return this._control;
  }

  @Input() set control(value: ApiBoiCardControl) {
    this._control = value;
    this.afterControlSet();
  }

  //endregion

  private readonly subs = new SubSink();

  // @ts-ignore
  dfControl: DfControl<FormField>;

  constructor(
    private readonly libBoController: LibBoController,
    private readonly libBoiController: LibBoiController,
    private readonly injector: Injector,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private afterControlSet() {
    this.initContext();
  }

  private initContext() {

    this.subs.unsubscribe();

    const { code$, viewType$, boiId$, fieldCodes } = this.control;

    const boId$: Observable<string> = code$.pipe(
      switchMap(code => safeObserve(this.libBoController.loadBoIdByCode(code))),
      shareResult(),
    );

    const boDetails$: Observable<BusinessObjectDetails> = combineLatest([boId$, viewType$]).pipe(
      switchMap(([boId, viewType]) => safeObserve(this.libBoController.loadBoDetailsById(boId, viewType))),
    );

    // @ts-ignore
    const boi$: Observable<BoInstance> = combineLatest([boId$, boiId$]).pipe(
      switchMap(([boId, boiId]) => {
        if (!boiId) { return of(undefined); }
        return safeObserve(this.libBoiController.loadBoi(boId, boiId));
      }),
    );

    this.subs.sink = combineLatest([boDetails$, boi$]).subscribe(([details, boi]) => {

      if (fieldCodes && fieldCodes.length > 0) {
        details.fields = details.fields
                                .filter(x => fieldCodes.includes(x.code))
                                .sort((a, b) => fieldCodes.indexOf(a.code) - fieldCodes.indexOf(b.code));
      }

      if (boi) {

        const fieldToValue = StringKeyedMap.withKey(boi.fields, x => x.fieldId);

        for (const field of details.fields) {
          field.value = fieldToValue.get(field.fieldId)?.value;
        }

      }

      this.dfControl = new DfControl({
        fields: details.fields,
        dffComponentResolver: this.control.dffResolver,
        dffValueF: DffValueF.parse,
        validatorF: createValidators,
        asyncValidatorF: createAsyncValidator(details.id, boi?.boInstanceId, this.libBoiController),
        hideF: field => field.type === BoFieldType.TAB_GROUP,
        needGridSort: false,
        injector: Injector.create({
          parent: this.injector, providers: [{
            provide: ApiBoiCardContext,
            useValue: ApiBoiCardContext.of({
              boId: details.id,
              boiId: boi?.boInstanceId,
              fieldId: this.control.forFieldId,
            }),
          }],
        }),
      });
      this.control._afterDfControlSet(this.dfControl);
      this.cdr.detectChanges();
      return;
    });

  }
}

export class DffAsyncValidator_isUnique implements DffAsyncValidator {

  constructor(
    public readonly boId: string,
    public readonly boiId: string,
    public readonly fieldId: string,
    public readonly controller: LibBoiController,
  ) {}

  validate(value: DffValue): Observable<string | undefined> {
    return this.controller.isFieldValueUnique(this.boId, this.boiId, this.fieldId, value.storedValue())
               .pipe(map(bool => bool ? undefined : 'validate_unique'));
  }
}

export function createAsyncValidator(boId: string, boiId: string, libBoiController: LibBoiController) {
  return (field: any) => {
    const res: DffAsyncValidator[] = [];
    if (field.isUnique) {
      res.push(new DffAsyncValidator_isUnique(boId, boiId, field.fieldId, libBoiController));
    }
    return res;
  };
}

export function createEmptyAsyncValidator() {
  return (field: any) => {
    const res: DffAsyncValidator[] = [];
    return res;
  };
}

