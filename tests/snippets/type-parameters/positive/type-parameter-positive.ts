// ✅ Single letter generics - T is most common
export function identity<T>(arg: T): T {
  return arg;
}

// ✅ Multiple generic types - T and U in alphabetical progression
export function map<T, U>(value: T, transform: (v: T) => U): U {
  return transform(value);
}

// ✅ Key-Value pairs - K and V are standard for dictionaries
export interface Dictionary<K, V> {
  get(key: K): V | undefined;
  set(key: K, value: V): void;
}

// ✅ Descriptive generic with T prefix - combines clarity with convention
export function mapArray<TItem, TResult>(
  items: TItem[],
  transform: (item: TItem) => TResult,
): TResult[] {
  return items.map(transform);
}

// ✅ Descriptive generic with T prefix - makes key/value types explicit
export type Cache<TKey, TValue> = Map<TKey, TValue>;

// ✅ Numeric subscript convention - useful for tuples
export type Tuple<T0, T1, T2, T3, T999> = [T0, T1, T2, T3, T999];

// ✅ Complex example combining all conventions
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

