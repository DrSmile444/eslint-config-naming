export const functionNamingDefaultPascalOrCamel = {
  selector: 'function',
  format: ['PascalCase', 'camelCase'],
  leadingUnderscore: 'allow',
} as const;
export const functionNamingExportedOrGlobal = {
  selector: 'function',
  modifiers: ['exported', 'global'],
  format: ['PascalCase', 'camelCase'],
  leadingUnderscore: 'allow',
} as const;
export const functionNamingCamelCase = {
  selector: 'function',
  format: ['camelCase'],
} as const;
