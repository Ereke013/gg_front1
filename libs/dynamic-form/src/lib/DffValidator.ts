import {Observable} from 'rxjs/internal/Observable';
import {DffValue} from './DffValue';

export interface DffValidator {

  validate(value: DffValue): string | undefined;

}

// export type DffAsyncValidator = (value: DynamicFormFieldValue) => Observable<string | undefined>

export interface DffAsyncValidator {

  validate(value: DffValue): Observable<string | undefined>;

}
