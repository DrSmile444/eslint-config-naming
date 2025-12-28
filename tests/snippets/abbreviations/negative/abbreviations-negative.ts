// Invalid names that use banned abbreviations from DENY_LIST

function abbreviationsNegativeExample() {
  // Variables - banned abbreviations
  const str = 'text'; // should be: string or text
  const num = 42; // should be: number or count
  const arr = [1, 2, 3]; // should be: array or items
  const obj = { key: 'value' }; // should be: object or specific domain name
  const fn = () => {}; // should be: function or callback
  const cb = () => {}; // should be: callback or onComplete
  const err = new Error(); // should be: error
  const msg = 'Hello'; // should be: message
  const cfg = {}; // should be: config or configuration
  const tmp = 'temp'; // should be: temporary or tempValue
  const data = {}; // should be: payload, result, or specific domain name
  const info = {}; // should be: metadata or details
  const val = 42; // should be: value
  const idx = 0; // should be: index
  const cnt = 5; // should be: count
  const len = 10; // should be: length
  const min = 0; // should be: minimum
  const max = 100; // should be: maximum
  const dir = '/path'; // should be: directory or direction
  const btn = null; // should be: button
  const el = null; // should be: element
  const img = null; // should be: image

  return {
    str,
    num,
    arr,
    obj,
    fn,
    cb,
    err,
    msg,
    cfg,
    tmp,
    data,
    info,
    val,
    idx,
    cnt,
    len,
    min,
    max,
    dir,
    btn,
    el,
    img,
  };
}

// Functions - banned abbreviations
function processStr() {} // should be: processString
function handleErr() {} // should be: handleError
function formatMsg() {} // should be: formatMessage
function validateCfg() {} // should be: validateConfig

// Parameters - banned abbreviations
function processReq(req: unknown, res: unknown) {
  // req and res should be: request and response (unless they're in framework context)
  return { req, res };
}

function handleData(data: unknown, info: unknown) {
  // data and info should be more specific
  return { data, info };
}

