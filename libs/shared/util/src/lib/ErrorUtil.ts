import {HttpErrorResponse} from '@angular/common/http';

export function extractErrorType(reason: HttpErrorResponse): string {
  if (typeof reason.error === 'string') {
    const error = JSON.parse(reason.error);
    return error.error_type;
  }
  return reason.error.error_type;
}

export function unsupportedOperation(...vars: any[]): Error {
  return new Error('Unsupported operation exception' + vars.reduce((p, c) => p + ' ' + c, ''));
}

export function requireNonNull(var1: any, varName?: string) {
  if (!var1) {
    throw new Error(`Variable \`${varName ? varName : ''}\` can not be null or undefined`);
  }
}

export function requireNonEmptyArray(arr: any[], arrName?: string) {
  requireNonNull(arr, arrName);
  if (arr.length === 0) {
    throw new Error(`Array \`${arrName ? arrName : ''}\` can not be empty`);
  }
}

export function tryOrLog<T>(f: () => T): T {
  try {
    return f();
  } catch (e) {
    console.error(e);
  }
}
