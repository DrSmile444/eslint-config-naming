import type { Linter } from 'eslint';

import { namingConventionRule } from '@rules/naming';

export const typescriptNamingConfig: Linter.Config[] = [
  {
    name: 'eslint-config-naming/typescript',
    rules: {
      '@typescript-eslint/naming-convention': namingConventionRule as unknown as Linter.RuleEntry,
    },
  },
];

export default typescriptNamingConfig;
