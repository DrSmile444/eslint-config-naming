import { defineConfig } from 'eslint/config';
import sonarjs from 'eslint-plugin-sonarjs';

/**
 * @description ESLint config for SonarJS code quality and security rules.
 * @author Dmytro Vakulenko
 * @see https://github.com/SonarSource/eslint-plugin-sonarjs
 */
export default defineConfig([
  {
    name: 'sonar-recommended',
    ...sonarjs.configs.recommended,
  },
  {
    name: 'sonar-custom',
    rules: {
      'sonarjs/function-return-type': 'warn',
      'sonarjs/no-commented-code': 'off',
      'sonarjs/no-selector-parameter': 'off',
      'sonarjs/redundant-type-aliases': 'off',
      'sonarjs/todo-tag': 'warn',
    },
  },
]);
