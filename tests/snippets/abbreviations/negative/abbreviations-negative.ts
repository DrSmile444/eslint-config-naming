// Invalid names that use banned abbreviations from DENY_LIST

// Global variables - banned abbreviations
export const msg = 'Hello'; // ❌ should be: message
const cfg = {}; // ❌ should be: config or configuration

function abbreviationsNegativeExample() {
  // Single-letter variables (except x, y, z) - all banned
  const a = [1, 2, 3]; // ❌ should be: array, items, values, etc.
  const b = true; // ❌ should be: boolean, isEnabled, flag, etc.
  const c = 'character'; // ❌ should be: character, count, class, etc.
  const d = { key: 'value' }; // ❌ should be: data, payload, etc.
  const e = new Error(); // ❌ should be: error, exception, event
  const f = () => {}; // ❌ should be: function, callback, handler
  const i = 0; // ❌ should be: index, itemIndex, rowIndex
  const j = 1; // ❌ should be: index, itemIndex, rowIndex
  const k = 2; // ❌ should be: index, key, keyIndex
  const n = 10; // ❌ should be: count, number, length
  const p = { x: 0, y: 0 }; // ❌ should be: point, position, parameter
  const s = 'text'; // ❌ should be: string, text, value
  const t = Date.now(); // ❌ should be: time, timestamp, token

  // Variables - banned abbreviations
  const str = 'text'; // ❌ should be: string or text
  const num = 42; // ❌ should be: number or count
  const arr = [1, 2, 3]; // ❌ should be: array or items
  const obj = { key: 'value' }; // ❌ should be: object or specific domain name
  const fn = () => {}; // ❌ should be: function or callback
  const cb = () => {}; // ❌ should be: callback or onComplete
  const err = new Error(); // ❌ should be: error
  const tmp = 'temp'; // ❌ should be: temporary or tempValue
  // NOTE: 'data', 'min', 'max' are in ALLOW_LIST, so they are not tested here
  const info = {}; // ❌ should be: metadata or details
  const val = 42; // ❌ should be: value
  const idx = 0; // ❌ should be: index
  const cnt = 5; // ❌ should be: count
  const len = 10; // ❌ should be: length
  const dir = '/path'; // ❌ should be: directory or direction
  const btn = null; // ❌ should be: button
  const el = null; // ❌ should be: element
  const img = null; // ❌ should be: image

  return {
    a,
    b,
    c,
    d,
    e,
    f,
    i,
    j,
    k,
    n,
    p,
    s,
    t,
    str,
    num,
    arr,
    obj,
    fn,
    cb,
    err,
    tmp,
    info,
    val,
    idx,
    cnt,
    len,
    dir,
    btn,
    el,
    img,
  };
}

// Functions - banned abbreviations
function processStr() {} // ❌ should be: processString
function handleErr() {} // ❌ should be: handleError
function formatMsg() {} // ❌ should be: formatMessage
function validateCfg() {} // ❌ should be: validateConfig

// Parameters - banned abbreviations
function processReq(req: unknown, res: unknown) {
  // ❌ req and res should be: request and response (unless in framework context)
  return { req, res };
}

function handleData(data: unknown, info: unknown) {
  // ❌ info should be more specific: metadata, details, etc.
  // Note: 'data' is in ALLOW_LIST
  return { data, info };
}

