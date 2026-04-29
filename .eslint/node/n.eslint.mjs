import { defineConfig } from 'eslint/config';
import nodePlugin from 'eslint-plugin-n';

/**
 * @description ESLint config for Node.js best practices using eslint-plugin-n.
 * @author Dmytro Vakulenko
 * @see https://github.com/eslint-community/eslint-plugin-n
 */
export default defineConfig([
  {
    name: 'n/recommended-module',
    extends: [nodePlugin.configs['flat/recommended-module']],
  },
]);
