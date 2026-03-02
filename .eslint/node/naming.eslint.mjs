import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// eslint-disable-next-line sonarjs/no-internal-api-use
import namingConfig from '../../node_modules/eslint-config-naming/dist/index.js';

/**
 * @description ESLint config for naming conventions using eslint-config-naming. Enforces consistent naming styles for variables, functions, classes, and other identifiers in TypeScript projects.
 * @author Dmytro Vakulenko
 * @see https://github.com/DrSmile444/eslint-config-naming
 */
export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tseslint.plugin },
    rules: namingConfig[0].rules,
  },
]);
