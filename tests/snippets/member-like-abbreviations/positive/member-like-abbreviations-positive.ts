// ✅ Valid member names without banned abbreviations

class ValidMemberNames {
  // Public members with descriptive names
  public userName = 'John'; // ✅ descriptive name
  public userEmail = 'john@example.com'; // ✅ descriptive name
  public isActive = true; // ✅ descriptive name

  // Private members with descriptive names
  private internalState = {}; // ✅ descriptive name
  private errorMessage = ''; // ✅ descriptive name

  // Protected members with descriptive names
  protected baseUrl = 'https://api.example.com'; // ✅ descriptive name
  protected logger = console; // ✅ descriptive name

  // Static members with descriptive names
  public static readonly API_VERSION = 'v1'; // ✅ UPPER_CASE for static readonly
  public static defaultConfig = {}; // ✅ camelCase for static
  private static instanceCount = 0; // ✅ descriptive name

  // Readonly members with descriptive names
  public readonly userId: string; // ✅ descriptive name
  private readonly CONFIG_KEY = 'app'; // ✅ UPPER_CASE readonly

  // Allowed abbreviations from ALLOW_LIST
  public id = 123; // ✅ 'id' is in ALLOW_LIST
  public url = 'https://example.com'; // ✅ 'url' is in ALLOW_LIST
  public api = null; // ✅ 'api' is in ALLOW_LIST
  public json = '{}'; // ✅ 'json' is in ALLOW_LIST

  // Coordinate variables are allowed
  private x = 0; // ✅ 'x' is allowed for coordinates
  private y = 0; // ✅ 'y' is allowed for coordinates
  private z = 0; // ✅ 'z' is allowed for coordinates

  constructor(userId: string) {
    this.userId = userId;
  }
}
