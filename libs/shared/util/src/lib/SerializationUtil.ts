export function dateToStr(date: Date): string | null {
  if (!date) { return null; }
  return JSON.stringify(date);
}

export function strToDate(str: string): Date | null {
  if (!str) { return null; }
  return new Date(JSON.parse(str));
}

export function arrayToStr<T>(array: T[]): string {
  if (!array) { return ''; }
  return JSON.stringify(array);
}

export function strToArray<T>(str: string): T[] {
  if (!str) { return []; }
  return JSON.parse(str) as T[];
}

export function objectToStr<T>(obj: T): string {
  return JSON.stringify(obj);
}

export function strToObject<T>(str: string): T {
  if (!str) { return {} as T; }
  return JSON.parse(str);
}

export function clone<T>(a: T): T {
  if (!a) { return a; }
  return JSON.parse(JSON.stringify(a));
}
