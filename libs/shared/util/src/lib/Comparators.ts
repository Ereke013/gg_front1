export class Comparators {
  public static byOrderIndexField = (a, b) => {
    if (a && b) {
      if (a.orderIndex === b.orderIndex) {
        return 0;
      }
      return a.orderIndex > b.orderIndex ? 1 : -1;
    }
    return -1;
  };

  public static byKey<T>(key: keyof T, nullsLast: boolean = true): (a: T, b: T) => (-1 | 1 | 0) {
    return this.byField(item => item[key], nullsLast);
  }

  public static byField<T, C>(keyGetter: (item: T) => C, nullsLast: boolean = true): (a: T, b: T) => (-1 | 1 | 0) {
    return (a: T, b: T) => {

      if (a == null || b == null) {
        return -1;
      }

      const aField = keyGetter(a);
      if (nullsLast && aField == null) {
        return 1;
      }

      const bField = keyGetter(b);
      if (!nullsLast && bField == null) {
        return 1;
      }

      if (aField === bField) {
        return 0;
      }

      return aField > bField ? 1 : -1;
    };
  }

  public static equals = (val1, val2) => val1 === val2;

}
