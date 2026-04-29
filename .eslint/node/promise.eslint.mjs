import { defineConfig } from 'eslint/config';
import pluginPromise from 'eslint-plugin-promise';

/**
 * @description ESLint config for Promise best practices using eslint-plugin-promise.
 * Catches missed returns in Promise chains, no-new Promise anti-patterns, and more.
 * @author Dmytro Vakulenko
 * @see https://github.com/eslint-community/eslint-plugin-promise
 */
export default defineConfig([
  {
    name: 'promise',
    ...pluginPromise.configs['flat/recommended'],
  },
]);
