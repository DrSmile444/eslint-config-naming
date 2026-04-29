import { defineConfig } from 'eslint/config';
import pluginRegexp from 'eslint-plugin-regexp';

/**
 * @description ESLint config for regex best practices using eslint-plugin-regexp.
 * Catches problematic patterns, redundant escapes, and potential ReDoS vulnerabilities.
 * @author Dmytro Vakulenko
 * @see https://github.com/ota-meshi/eslint-plugin-regexp
 */
export default defineConfig([
  {
    name: 'regexp',
    ...pluginRegexp.configs['flat/recommended'],
  },
]);
