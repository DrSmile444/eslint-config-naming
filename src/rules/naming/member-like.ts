export const memberLikePublicStaticNaming = {
  selector: 'memberLike',
  modifiers: ['public', 'static'],
  format: ['PascalCase', 'UPPER_CASE'],
  leadingUnderscore: 'allow',
} as const;
export const memberLikePrivateStaticNaming = {
  selector: 'memberLike',
  modifiers: ['private', 'static'],
  format: ['PascalCase', 'UPPER_CASE'],
  leadingUnderscore: 'forbid',
} as const;
export const memberLikePublicNaming = {
  selector: 'memberLike',
  modifiers: ['public'],
  format: ['camelCase', 'snake_case'],
  leadingUnderscore: 'allow',
} as const;
export const memberLikePrivateNaming = {
  selector: 'memberLike',
  modifiers: ['private'],
  format: ['camelCase'],
  leadingUnderscore: 'forbid',
} as const;
export const memberLikePrivateReadonlyNaming = {
  selector: 'memberLike',
  modifiers: ['private', 'readonly'],
  format: ['UPPER_CASE', 'camelCase'],
  leadingUnderscore: 'forbid',
} as const;
export const memberLikeProtectedNaming = {
  selector: 'memberLike',
  modifiers: ['protected'],
  format: ['camelCase'],
  leadingUnderscore: 'require',
} as const;
