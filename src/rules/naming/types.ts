export const enumMemberNaming = {
  selector: 'enumMember',
  format: ['UPPER_CASE'],
} as const;

export const interfaceNaming = {
  selector: 'interface',
  format: ['PascalCase'],
  custom: {
    regex: '^[IT][A-Z]',
    match: false,
  },
} as const;

export const classNaming = {
  selector: 'class',
  format: ['PascalCase'],
} as const;

export const enumNaming = {
  selector: 'enum',
  format: ['PascalCase'],
  custom: {
    regex: '(^[IT][A-Z])|(.*es$)|(.*[^us]s$)',
    match: false,
  },
} as const;

export const typeLikeNaming = {
  selector: 'typeLike',
  format: ['PascalCase'],
  custom: {
    regex: '^[IT][A-Z]',
    match: false,
  },
} as const;
