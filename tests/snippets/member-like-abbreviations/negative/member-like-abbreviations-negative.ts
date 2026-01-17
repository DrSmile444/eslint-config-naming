// ❌ Invalid member names that use banned abbreviations from DENY_LIST

class InvalidMemberNames {
  // Public members with banned abbreviations
  public msg = 'Hello'; // ❌ should be: message
  public cfg = {}; // ❌ should be: config or configuration
  public err = null; // ❌ should be: error
  public info = {}; // ❌ should be: metadata, details, or summary
  public val = 42; // ❌ should be: value
  public btn = null; // ❌ should be: button
  public str = 'text'; // ❌ should be: string or text
  public num = 0; // ❌ should be: number or count
  public arr = []; // ❌ should be: array or items
  public obj = {}; // ❌ should be: object or specific domain name

  // Private members with banned abbreviations
  private tmp = null; // ❌ should be: temporary or tempValue
  private idx = 0; // ❌ should be: index or itemIndex
  private cnt = 0; // ❌ should be: count or total
  private len = 0; // ❌ should be: length
  private dir = '/path'; // ❌ should be: directory or direction
  private fn = () => {}; // ❌ should be: function or callback
  private cb = () => {}; // ❌ should be: callback or onComplete

  // Protected members with banned abbreviations
  protected req = null; // ❌ should be: request
  protected res = null; // ❌ should be: response or result
  protected el = null; // ❌ should be: element
  protected img = null; // ❌ should be: image

  // Static members with banned abbreviations
  public static svc = null; // ❌ should be: service
  public static ctrl = null; // ❌ should be: controller
  public static mgr = null; // ❌ should be: manager
  private static dbg = false; // ❌ should be: debug or debugInfo

  // Readonly members with banned abbreviations
  public readonly usr = 'user'; // ❌ should be: user
  private readonly ver = '1.0'; // ❌ should be: version

  // Single-letter members (except x, y, z)
  private a = 1; // ❌ should be: descriptive name like 'array', 'attribute', 'value'
  private b = true; // ❌ should be: descriptive name with boolean prefix
  private c = ''; // ❌ should be: descriptive name like 'character', 'count', 'class'
  private d = {}; // ❌ should be: descriptive name (not 'data' - too vague)
  private e = new Error(); // ❌ should be: error, event, or element
  private i = 0; // ❌ should be: index, itemIndex, or rowIndex
  private n = 10; // ❌ should be: count, length, or number
}
