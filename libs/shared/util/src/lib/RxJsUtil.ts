import {EMPTY, MonoTypeOperatorFunction, Observable, Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {catchError, map, shareReplay} from 'rxjs/operators';

export const DEBOUNCE_TIME = 500;

export function safeUnsub(...subscriptions: Subscription[]) {
  for (const subscription of subscriptions) {
    if (subscription) { subscription.unsubscribe(); }
  }
}

export const promisify: <T>(observable: Observable<HttpResponse<T>>) => Promise<T>
  = <T>(observable: Observable<HttpResponse<T>>) =>
  (observable.toPromise().then(x => x.body as T) as Promise<T>);

export const logAndReturnEmpty: (err) => Observable<never> = err => {
  console.error(err);
  return EMPTY;
};

/**
 * Shares the result of observable for subscribers and unsubscribe from
 * source when there is no subscribers
 */
export function shareResult<T>(): MonoTypeOperatorFunction<T> {
  return shareReplay<T>({ bufferSize: 1, refCount: true });
}

export const safeObserve: <T>(observable: Observable<T>, catcher?: (err) => Observable<T>) => Observable<T>
  = <T>(observable: Observable<T>, catcher: (err) => Observable<T> = logAndReturnEmpty) => observable.pipe(catchError(catcher));

export const mapBody: <T>(observable: Observable<HttpResponse<T>>) => Observable<T>
  = <T>(observable: Observable<HttpResponse<T>>) => observable.pipe(map(x => x.body as T));
