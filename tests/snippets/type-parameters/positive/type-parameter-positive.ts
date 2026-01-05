// Single letter generic type parameters
export function identity<T>(arg: T): T {
  return arg;
}

// Multiple generic type parameters
export function map<T, U>(value: T, transform: (v: T) => U): U {
  return transform(value);
}

// Key-Value pairs
export interface Dictionary<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
}

// Descriptive generic with T prefix
export function mapArray<TItem, TResult>(
  items: TItem[],
  transform: (item: TItem) => TResult,
): TResult[] {
  return items.map(transform);
}

// Descriptive generic with K/V prefix
export type Cache<KKey, VValue> = Map<KKey, VValue>;

// Numeric subscript convention
export type Tuple<T1, T2, T3> = [T1, T2, T3];

// Other common single letters
export interface Response<R> {
  data: R;
}

export interface ErrorWrapper<E> {
  error: E;
}

// Complex example with multiple conventions
export class GenericContainer<T, TData, K1, K2> {
  private value: T;

  private data: TData;

  private keys: [K1, K2];

  constructor(value: T, data: TData, keys: [K1, K2]) {
    this.value = value;
    this.data = data;
    this.keys = keys;
  }
}

