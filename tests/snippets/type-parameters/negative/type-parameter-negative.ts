// ❌ Descriptive name without prefix - should use T or TType
function bad1<Type>(arg: Type): Type {
  return arg;
}

// ❌ Lowercase t prefix - generic type parameters must be uppercase
function bad2<tItem>(items: tItem[]): tItem[] {
  return items;
}

// ❌ No T prefix for descriptive names - should use TData
function bad3<Data>(data: Data): Data {
  return data;
}

// ❌ Redundant Type suffix - TItem is sufficient
function bad4<TItemType>(item: TItemType): TItemType {
  return item;
}

// ❌ Redundant prefix on K and V - should be TKey and TValue, not KKey and VVal
interface BadDict<KKey, VVal> {
  get(key: KKey): VVal;
}

// ❌ Non-standard single letters (lowercase) - must be uppercase
function bad5<a, b>(x: a, y: b): [a, b] {
  return [x, y];
}

// ❌ Snake case - should use PascalCase like TItem
function bad6<T_Item>(items: T_Item[]): T_Item[] {
  return items;
}

// ❌ camelCase - should use PascalCase like TData
function bad7<tData>(data: tData): tData {
  return data;
}


