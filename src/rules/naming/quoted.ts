export const quotedMemberNaming = {
  selector: [
    'classProperty',
    'objectLiteralProperty',
    'typeProperty',
    'classMethod',
    'objectLiteralMethod',
    'typeMethod',
    'accessor',
    'enumMember',
  ],
  modifiers: ['requiresQuotes'],
  format: null,
} as const;
