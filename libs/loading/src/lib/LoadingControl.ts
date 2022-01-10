import {catchError, tap} from 'rxjs/operators';
import {pipe, UnaryFunction} from 'rxjs';
import {LoadingDirective, LoadingState} from './loading.directive';
import {Observable} from 'rxjs/internal/Observable';

export function loading<T>(control: LoadingControl): UnaryFunction<Observable<T>, Observable<T>> {
  return pipe(
    tap<T>(() => control.setLoaded()),
    catchError(err => {
      control.setError(err);
      throw err;
    }),
  );
}

export class LoadingControl {
  private directive: LoadingDirective;
  private state: LoadingState;
  private err: Error;

  constructor(state?: LoadingState) {
    this.state = state ?? LoadingState.PENDING;
  }

  setPending() {
    this.state = LoadingState.PENDING;
    this.err = undefined;
    this.updateDirectiveState();
  }

  setLoaded() {
    this.state = LoadingState.LOADED;
    this.err = undefined;
    this.updateDirectiveState();
  }

  setError(err: Error) {
    this.state = LoadingState.ERROR;
    this.err = err;
    this.updateDirectiveState();
  }

  is(state: LoadingState) {
    return this.state === state;
  }

  _registerDirective(directive: LoadingDirective) {
    this.directive = directive;
    this.updateDirectiveState();
  }

  _deregisterDirective() {
    this.directive = undefined;
  }

  private updateDirectiveState() {
    if (!this.directive) { return; }
    this.directive.error = this.err;
    this.directive.setState(this.state);
  }
}
