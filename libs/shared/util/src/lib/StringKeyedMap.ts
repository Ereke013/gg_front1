// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type StringKeyedMapType<V> = { [key: string]: V; };

export class StringKeyedMap<V> {
  private object: StringKeyedMapType<V> = {} as StringKeyedMapType<V>;
  private len = 0;

  set(key: string, value: V) {
    if (!this.has(key)) {
      this.len++;
    }
    this.object[key] = value;
  }

  get(key: string): V {
    return this.object[key];
  }

  values(): V[] {
    return Object.values<V>(this.object);
  }

  size(): number {
    return this.len;
  }

  clear(): void {
    this.len = 0;
    this.object = {} as StringKeyedMapType<V>;
  }

  delete(key: string): boolean {
    if (!this.has(key)) { return false; }
    this.len--;
    delete this.object[key];
    return true;
  }

  has(key: string): boolean {
    return this.object.hasOwnProperty(key);
  }

  keys(): string[] {
    return Object.keys(this.object);
  }

  static withKey<V>(items: V[], extractKey: (item: V) => string): StringKeyedMap<V> {
    const map = new StringKeyedMap<V>();
    for (const item of items) {
      const key = extractKey(item);
      map.set(key, item);
    }
    return map;
  }

}
