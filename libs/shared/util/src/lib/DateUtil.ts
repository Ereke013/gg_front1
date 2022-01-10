import {DatePipe} from '@angular/common';

export function asDate(date: number | Date | string): Date | undefined {
  if (!date) { return undefined; }
  if (date instanceof Date) {
    return date;
  }
  return new Date(date);
}

// noinspection JSUnusedGlobalSymbols
export function clearTimezone(date: Date): Date {
  if (!date) {
    return date;
  }
  const datePipe = new DatePipe('en-US');
  const dateStr = datePipe.transform(date, 'yyyy-MM-ddTHH:mm:ss.sss', '0000');
  return new Date(dateStr + 'Z');
}
