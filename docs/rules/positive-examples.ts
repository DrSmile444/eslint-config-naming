// Types
class User {}
interface ApiResponse {}
enum Status {
  ACTIVE,
  INACTIVE,
}

// Members
class Example {
  public myProperty: string;
  private myPrivateProperty: string;
  protected myProtectedProperty: string;
  public static MyStaticProperty: number;
  private static myStaticPrivate: string;
  public readonly myReadonly: boolean;
  private readonly MY_READONLY_CONSTANT: number;
}

// Variables
const myVariable = 'value';
const MY_CONSTANT = 'constant';
const isReady = true;

// Functions
function myFunction() {}

// Parameters
function example(param1: string, param2: number, callback: () => void) {}

export type Cache<TKey, TValue> = Map<TKey, TValue>;

// Abbreviation examples - descriptive names
const errorMessage = 'Failed to connect';

function processUserData() {}

function handleRequest(requestData: Request, onComplete: () => void) {}
