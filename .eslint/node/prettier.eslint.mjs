import { defineConfig } from 'eslint/config';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/**
 * @description Prettier integration as an ESLint rule. Formatting violations are reported as ESLint errors.
 * eslint-plugin-prettier/recommended includes eslint-config-prettier which disables conflicting rules.
 * @author Dmytro Vakulenko
 * @see https://github.com/prettier/eslint-plugin-prettier
 */
export default defineConfig([eslintPluginPrettierRecommended]);
