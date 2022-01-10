export function nullToEmptyStr(obj: string | number): string {
  if (!obj) {
    return '';
  }
  return obj + '';
}
