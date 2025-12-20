export const parameterNamingBase = {
  selector: 'parameter',
  format: ['camelCase'],
  leadingUnderscore: 'allow',
} as const;

export const parameterNamingDestructured = {
  selector: 'parameter',
  modifiers: ['destructured'],
  format: ['camelCase', 'snake_case'],
  leadingUnderscore: 'allow',
} as const;
