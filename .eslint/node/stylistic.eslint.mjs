import stylistic from '@stylistic/eslint-plugin';

/**
 * @description ESLint config for enforcing stylistic code rules using @stylistic/eslint-plugin. Applies padding and formatting rules for code consistency.
 * @author Dmytro Vakulenko
 * @version 1.3.0
 * @see https://github.com/eslint-stylistic/eslint-stylistic
 */
export default [
  {
    name: 'stylistic',
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', next: 'return', prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          next: ['const', 'let', 'var'],
          prev: ['const', 'let', 'var'],
        },
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'any', next: 'directive', prev: 'directive' },
        {
          blankLine: 'always',
          next: '*',
          prev: 'multiline-block-like',
        },
        {
          blankLine: 'always',
          next: 'if',
          prev: ['if', 'const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          next: ['const', 'let', 'var'],
          prev: ['if'],
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['import'],
        },
        {
          blankLine: 'any',
          next: 'import',
          prev: 'import',
        },
        {
          blankLine: 'always',
          next: ['class', 'function'],
          prev: ['class', 'function'],
        },
        // Note: multiline-const/let/expression rules do NOT apply to exports (handled separately below)
        {
          blankLine: 'always',
          next: ['multiline-const', 'multiline-let', 'multiline-expression'],
          prev: '*',
        },
        {
          blankLine: 'any',
          next: ['multiline-const', 'multiline-let', 'multiline-expression'],
          prev: 'export',
        },
        {
          blankLine: 'always',
          next: '*',
          prev: ['multiline-const', 'multiline-let', 'multiline-expression'],
        },
        {
          blankLine: 'any',
          next: 'export',
          prev: ['multiline-const', 'multiline-let', 'multiline-expression'],
        },
        { blankLine: 'always', next: 'block', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'block' },
        { blankLine: 'always', next: 'block-like', prev: '*' },
        { blankLine: 'always', next: '*', prev: 'block-like' },
        { blankLine: 'always', next: 'return', prev: '*' },
        // Allow flexible spacing for exports (to accommodate JSDoc comments) - must come before case/default rules
        {
          blankLine: 'any',
          next: 'export',
          prev: '*',
        },
        {
          blankLine: 'any',
          next: '*',
          prev: 'export',
        },
        {
          blankLine: 'any',
          next: ['multiline-const', 'multiline-let', 'multiline-expression'],
          prev: 'export',
        },
        {
          blankLine: 'any',
          next: 'export',
          prev: ['multiline-const', 'multiline-let', 'multiline-expression'],
        },
        // case/default rules - must come LAST to override all other rules including block-like
        // First, set default behavior: no blank lines between case/default statements
        { blankLine: 'never', next: 'default', prev: 'case' },
        { blankLine: 'never', next: 'case', prev: 'case' },
        { blankLine: 'never', next: 'default', prev: '*' },
        { blankLine: 'never', next: 'case', prev: '*' },
        { blankLine: 'never', next: '*', prev: 'case' },
        { blankLine: 'never', next: '*', prev: 'default' },
        // Then, override: always blank line after case block (with body) before next case/default
        { blankLine: 'always', next: 'case', prev: 'block-like' },
        { blankLine: 'always', next: 'default', prev: 'block-like' },
      ],
      // Enforce blank line before block comments (JSDoc), but not after
      '@stylistic/lines-around-comment': [
        'error',
        {
          beforeBlockComment: true,
          afterBlockComment: false,
          allowBlockStart: true,
          allowObjectStart: true,
          allowArrayStart: true,
          allowClassStart: true,
          applyDefaultIgnorePatterns: true,
        },
      ],
    },
  },
];
