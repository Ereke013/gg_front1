export interface DffValue {
  storedValue(): string;

  parse(str: string): DffValue;

  isEmpty(): boolean;
}
