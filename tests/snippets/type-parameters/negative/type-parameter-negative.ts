// ❌ Leading T but not alone (should use TType or just use a descriptive name)
function bad1<Type>(arg: Type): Type {
  return arg;
}

// ❌ Lowercase t prefix
function bad2<tItem>(items: tItem[]): tItem[] {
  return items;
}

// ❌ No T prefix for descriptive names
function bad3<Data>(data: Data): Data {
  return data;
}

// ❌ Redundant Type suffix
function bad4<TItemType>(item: TItemType): TItemType {
  return item;
}

// ❌ Redundant prefix on K and V
interface BadDict<KKey, VVal> {
  get(key: KKey): VVal;
}

// ❌ Non-standard single letters (lowercase)
function bad5<a, b>(x: a, y: b): [a, b] {
  return [x, y];
}

// ❌ Snake case
function bad6<T_Item>(items: T_Item[]): T_Item[] {
  return items;
}

// ❌ camelCase
function bad7<tData>(data: tData): tData {
  return data;
}


