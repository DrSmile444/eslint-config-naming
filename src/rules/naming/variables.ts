export const variableNamingDefault = {
  selector: 'variable',
  format: ['camelCase', 'UPPER_CASE'],
} as const;

export const variableNamingConstGlobal = {
  selector: 'variable',
  modifiers: ['const', 'global'],
  format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
  leadingUnderscore: 'allow',
} as const;

export const variableNamingDestructured = {
  selector: 'variable',
  modifiers: ['destructured'],
  format: ['PascalCase', 'camelCase', 'snake_case'],
  leadingUnderscore: 'allow',
} as const;

export const booleanVariableWithPrefixNaming = {
  selector: 'variable',
  types: ['boolean'],
  format: ['PascalCase'],
  prefix: ['is', 'are', 'has', 'can', 'should', 'will', 'did'],
} as const;

// Allow destructured without prefixes – suitable for lib props
export const booleanDestructuredVariableNaming = {
  selector: 'variable',
  modifiers: ['destructured'],
  types: ['boolean'],
  format: null,
} as const;

// Allow `EditActionComponent`
export const componentVariableNaming = {
  selector: 'variable',
  format: ['PascalCase'],
  filter: {
    match: true,
    regex: String.raw`^\w*Component$`,
  },
} as const;

// Allow common Node.js variables like __filename and __dirname
export const nodeCommonVariableNaming = {
  selector: 'variable',
  format: null,
  filter: {
    match: true,
    regex: String.raw`^__(filename|dirname)$`,
  },
} as const;
