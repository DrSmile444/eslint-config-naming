import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line sonarjs/no-internal-api-use
import namingConfig from '../../node_modules/eslint-config-naming/dist/index.js';

/**
 * @description Naming convention rules via eslint-config-naming, scoped to TypeScript files.
 * @author Dmytro Vakulenko
 * @see https://github.com/DrSmile444/eslint-config-naming
 */
export default defineConfig([
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: namingConfig[0].rules,
  },
]);
