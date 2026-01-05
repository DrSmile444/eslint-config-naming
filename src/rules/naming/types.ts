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
  selector: 'typeAlias',
  format: ['PascalCase'],
  custom: {
    regex: '^[IT][A-Z]',
    match: false,
  },
} as const;

export const typeParameterNaming = {
  selector: 'typeParameter',
  format: ['PascalCase'],
  custom: {
    regex: '^(T|U|V|K|T[A-Z][a-zA-Z]*|K[A-Z][a-zA-Z]*|V[A-Z][a-zA-Z]*|[TKV][1-9][0-9]*)$',
    match: true,
  },
} as const;
