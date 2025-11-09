import type { RuleConfig } from '@eslint/core';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import type { Linter } from 'eslint';

import { namingConventionRule } from '../rules/naming';

export const typescriptNamingConfig: Linter.Config[] = [
  {
    name: '@drsmile444/eslint-config-naming/typescript',
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser,
      parserOptions: {
        // Keep this aligned with your original config.
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin as never,
    },
    rules: {
      '@typescript-eslint/naming-convention': namingConventionRule as unknown as RuleConfig,
    },
  },
];
