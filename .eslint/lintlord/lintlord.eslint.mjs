import { defineConfig } from 'eslint/config';
import lintlord from 'eslint-plugin-lintlord';

/**
 * @description ESLint config for lintlord custom rules.
 * strict preset enables prefer-logger (mode: all) and no-inline-interface-object-types.
 * @author Dmytro Vakulenko
 */
export default defineConfig([lintlord.configs.strict]);
