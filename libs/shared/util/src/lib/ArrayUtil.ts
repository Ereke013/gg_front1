/**
 * Исключает элементы первого массива которые имеются во втором массиве
 * @return Исключенные элементы из первого массива
 *
 *
 * К примеру, передаётся [1, 2, 3], [3, 4, 5];
 * Результатом будет [1, 2]
 *
 */

export function excludeFromFirstArray<T, S>(array1: T[], array2: S[], comparator: (val1: T, val2: S) => boolean) {

  const ret: T[] = [];
  array1.forEach(val => {
    const res = array2.find(val2 => comparator(val, val2));
    if (!res) {
      ret.push(val);
    }
  });

  return ret;
}

export function removeIf<T>(array: T[], condition: (value: T) => boolean) {
  array.forEach((value, index) => {
    if (condition(value)) {
      array.splice(index, 1);
    }
  });
}

export function groupBy<T, K = string>(list: T[], keyGetter: (it: T) => K): Map<K, T[]> {
  const map = new Map();
  for (const item of list) {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  }
  return map;
}
