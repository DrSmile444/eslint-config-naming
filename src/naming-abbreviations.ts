// File: naming-abbreviations.ts

/**
 * Common anti-patterns this file targets (and how to fix them):
 *
 * 1) Single-letter names (except very limited domains like coordinates):
 *    - i/j/k -> index / rowIndex / colIndex
 *    - e -> event / error (pick one based on meaning)
 *
 * 2) Ambiguous abbreviations:
 *    - dir -> directory OR direction (choose the correct intent)
 *    - res -> response OR result OR resource (don’t guess)
 *    - auth -> authentication OR authorization (be explicit)
 *
 * 3) “Meaningless” buckets / vague names (often hide intent):
 *    - data -> payload / result / records / responseBody / input
 *    - info -> metadata / details / summary
 *    - obj -> user / config / payload / dto (name the domain object)
 *
 * Tip: Keep ALLOW_LIST for ecosystem-idiomatic identifiers that are hard to avoid
 * (e.g., Express req/res, Koa ctx), ideally allowed only for *parameters* in your rule.
 */

// #region DENY_LIST
/**
 * DENY_LIST:
 * key   = abbreviation / anti-pattern identifier you want to forbid
 * value = allowed replacements (full names or clearer alternatives)
 */
export const DENY_LIST: Readonly<Record<string, readonly string[]>> = {
  // Single-letter / too short (x, y, z are allowed for coordinates)
  a: ['array', 'attribute', 'value', 'accumulator'],
  b: ['boolean', 'buffer', 'byte', 'value'],
  c: ['character', 'count', 'class', 'component'],
  d: ['data', 'day', 'distance', 'delta'],
  e: ['event', 'error', 'exception', 'element'],
  f: ['function', 'field', 'flag', 'file'],
  g: ['group', 'global', 'get'],
  h: ['height', 'handler', 'hash', 'header'],
  i: ['index', 'itemIndex', 'rowIndex', 'columnIndex'],
  j: ['index', 'itemIndex', 'rowIndex', 'columnIndex'],
  k: ['index', 'key', 'keyIndex'],
  l: ['length', 'list', 'line', 'label'],
  m: ['map', 'message', 'method', 'model'],
  n: ['count', 'length', 'number', 'node'],
  o: ['object', 'option', 'output'],
  p: ['parameter', 'property', 'position', 'point'],
  q: ['query', 'queue', 'question'],
  r: ['result', 'response', 'record', 'row'],
  s: ['string', 'source', 'state', 'status'],
  t: ['type', 'time', 'token', 'text'],
  u: ['user', 'url', 'unit', 'update'],
  v: ['value', 'variable', 'version'],
  w: ['width', 'window', 'wrapper'],
  // x, y, z are allowed in ALLOW_LIST for coordinate systems

  // Core types / primitives
  str: ['string', 'text'],
  num: ['number', 'amount', 'count'],
  bool: ['boolean', 'isEnabled', 'hasValue'],
  fn: ['function', 'handler', 'callback'],
  cb: ['callback', 'onComplete', 'onSuccess', 'onError'],

  // Generic “intent-hiding” names (common anti-patterns)
  data: ['payload', 'result', 'records', 'responseBody', 'input', 'output'],
  info: ['metadata', 'details', 'summary', 'diagnostics'],
  obj: ['object', 'entity', 'model', 'payload'], // or ideally: rename to the real domain noun
  val: ['value', 'result', 'item', 'entry'],
  tmp: ['temporary', 'tempValue', 'scratch'],
  temp: ['temporary', 'tempValue', 'scratch'],
  misc: ['other', 'fallback', 'unknown'],
  stuff: ['items', 'things', 'resources'],

  // Collections / data structures
  arr: ['array', 'list', 'items', 'elements'],
  lst: ['list', 'items', 'values'],
  coll: ['collection', 'items', 'elements'],
  dict: ['dictionary', 'map'],
  kv: ['keyValue', 'keyValuePair'],
  idx: ['index', 'itemIndex'],
  cnt: ['count', 'total', 'quantity'],
  qty: ['quantity', 'count', 'amount'],
  len: ['length'],
  max: ['maximum', 'upperBound'],
  min: ['minimum', 'lowerBound'],

  // Strings / formats
  fmt: ['format', 'formatter'],
  tpl: ['template'],
  tmpl: ['template'],
  re: ['regex', 'pattern'],
  regex: ['regularExpression', 'pattern'], // if you want to enforce full wording
  md: ['markdown'],
  csv: ['commaSeparatedValues'],
  tsv: ['tabSeparatedValues'],

  // Time
  dt: ['dateTime', 'date'],
  ts: ['timestamp'],
  ms: ['milliseconds'],
  sec: ['seconds'],
  mins: ['minutes'],
  hrs: ['hours'],
  dur: ['duration'],
  ttl: ['timeToLive', 'cacheTtl'],
  eta: ['estimatedTimeOfArrival', 'estimatedDuration'],

  // Filesystem / paths
  dir: ['directory', 'direction'], // ambiguous by design — choose meaning
  cwd: ['currentWorkingDirectory'],
  fname: ['fileName'],
  fpath: ['filePath'],
  ext: ['extension', 'fileExtension'],
  buf: ['buffer'],
  cfg: ['config', 'configuration'],
  conf: ['config', 'configuration'],

  // Web / networking (common ambiguous ones)
  req: ['request'],
  res: ['response', 'result', 'resource'], // ambiguous outside frameworks
  resp: ['response'],
  hdr: ['header'],
  hdrs: ['headers'],
  qs: ['queryString'],
  urlStr: ['url', 'urlString'],
  uriStr: ['uri', 'uriString'],

  // Auth/security ambiguous
  auth: ['authentication', 'authorization'], // pick one
  authn: ['authentication'],
  authz: ['authorization'],
  cred: ['credential'],
  creds: ['credentials'],
  tok: ['token'],
  jwtStr: ['jwt', 'jwtToken'],

  // Architecture / layers
  svc: ['service'],
  ctrl: ['controller'],
  mgr: ['manager'],
  repo: ['repository'],
  util: ['utility', 'helpers'],
  impl: ['implementation'],

  // UI / DOM
  el: ['element'],
  elem: ['element'],
  evt: ['event'],
  btn: ['button'],
  lbl: ['label'],
  img: ['image'],
  nav: ['navigation'],
  dlg: ['dialog'],
  notif: ['notification'],

  // Business-ish (often seen, often unclear)
  usr: ['user'],
  acct: ['account'],
  addr: ['address'],
  amt: ['amount'],
  bal: ['balance'],
  inv: ['invoice', 'inventory'], // ambiguous

  // Database-ish
  dbConn: ['databaseConnection'],
  txn: ['transaction'],
  tx: ['transaction'],
  tbl: ['table'],
  col: ['column'],
  rec: ['record'],
  recs: ['records'],
  ver: ['version'],
  rev: ['revision'],

  // Observability
  dbg: ['debug', 'debugInfo'],
  msg: ['message'],
  err: ['error'], // if you want “error” only; remove if you want to allow err
} as const;
// #endregion DENY_LIST

// #region ALLOW_LIST
/**
 * ALLOW_LIST:
 * Identifiers allowed “as-is” because they are widely-recognized initialisms,
 * ecosystem conventions, or required by external APIs/frameworks.
 *
 * Recommendation: In your ESLint rule, allow some of these ONLY in specific contexts:
 * - function params: req, res, ctx, next
 * - well-known technical initialisms: id, url, api, ui, db, json, html, css, uuid, jwt
 */
export const ALLOW_LIST: readonly string[] = [
  // Very common initialisms / ubiquitous
  'id',
  'ids',
  'url',
  'urls',
  'uri',
  'uris',
  'api',
  'ui',
  'ux',
  'db',
  'sql',
  'json',
  'yaml',
  'yml',
  'html',
  'css',
  'uuid',
  'jwt',
  'ip',
  'dns',
  'http',
  'https',
  'min',
  'max',
  'md',
  'csv',
  'tsv',
  'ts', // false positive for TypeScript files
  'ms',
  'regex',

  // Node / platform conventions
  'fs', // Node.js "fs" module is standard

  // Framework-idiomatic params (consider allowing only as parameters)
  // 'req',
  // 'res',
  // 'ctx',
  'next',

  // Single-letter coordinate variables (allowed for geometry/render contexts)
  'x',
  'y',
  'z',
] as const;
// #endregion ALLOW_LIST
