import { defineConfig } from 'eslint/config';
import lintlord from 'eslint-plugin-lintlord';

/**
 * @description ESLint config for lintlord custom rules.
 * prefer-logger in 'all' mode enforces using the project logger instead of any console.* method.
 * no-inline-interface-object-types enforces extracting inline object types in interfaces and function parameters.
 * @author Dmytro Vakulenko
 */
export default defineConfig([
  lintlord.configs.strict,
  {
    name: 'lintlord',
    rules: {
      'lintlord/prefer-logger': [
        'error',
        {
          mode: 'all',
        },
      ],
    },
  },
]);
