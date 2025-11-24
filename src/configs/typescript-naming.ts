import type { RuleConfig } from '@eslint/core';
import type { Linter } from 'eslint';

import { namingConventionRule } from '@rules/naming';

export const typescriptNamingConfig: Linter.Config[] = [
  {
    name: '@drsmile444/eslint-config-naming/typescript',
    rules: {
      '@typescript-eslint/naming-convention': namingConventionRule as unknown as RuleConfig,
    },
  },
];

export default typescriptNamingConfig;
