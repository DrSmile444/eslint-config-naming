import { defineConfig } from 'eslint/config';

import nodeConfigs from './.eslint/node.eslint.mjs';
import vitestEslint from './.eslint/vitest.eslint.mjs';

export default defineConfig([
  // Apply this config to js and ts files only
  {
    name: 'Source Files to scan',
    files: ['**/*.{js,mjs,cjs,ts}'],
  },
  {
    ignores: ['node_modules', 'function-out.js', 'tests/snippets/**', 'docs/.vitepress/cache/**'],
  },
  // Node config
  ...nodeConfigs,
  // Specific config for VitePress config files
  {
    files: ['docs/.vitepress/**/*.ts'],
    languageOptions: {
      parserOptions: {
        project: './docs/.vitepress/tsconfig.json',
        projectService: false,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  // Vitest rules for testing
  ...vitestEslint,
]);
