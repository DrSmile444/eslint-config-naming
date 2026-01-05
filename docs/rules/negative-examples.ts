// Types - should be PascalCase, no I/T prefixes
class user {}
interface IApiResponse {}
enum status {
  active,
  inactive,
}

// Members - various violations
class Example {
  public MyProperty: string; // should be camelCase or snake_case
  private _myPrivateProperty: string; // no leading _ for private
  protected myProtectedProperty: string; // protected needs leading _
  public static myStaticProperty: number; // can be camelCase, PascalCase, or UPPER_CASE
  private static _myStaticPrivate: string; // no leading _ for private static
  public readonly MyReadonly: boolean; // should be camelCase or UPPER_CASE
  private readonly my_readonly_constant: number; // should be camelCase or UPPER_CASE
}

// Variables - case and boolean prefix violations
const Myvariable = 'value'; // should be camelCase or UPPER_CASE
const my_constant = 'constant'; // should be UPPER_CASE
const ready = true; // booleans should start with is|should|has|can|did|will

// Functions - case violations
function MyFunction() {
} // should be camelCase

// Parameters - case violations
function example(Param1: string, Param2: number, Callback: () => void) {
} // should be camelCase

export type Cache<Key, val> = Map<Key, val>; // generics should follow T, U, V, TItem, TValue, etc.

// Abbreviation examples - banned abbreviations
const str = 'Failed to connect';

function processStr() {}

function process(req: Request, res: Response) {}
