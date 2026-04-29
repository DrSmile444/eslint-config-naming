import { defineConfig } from 'eslint/config';
import noBarrelFiles from 'eslint-plugin-no-barrel-files';

/**
 * @description ESLint config that disallows barrel (index re-export) files.
 * Barrel files hurt tree-shaking and increase bundle sizes.
 * @author Dmytro Vakulenko
 * @see https://github.com/nicolo-ribaudo/eslint-plugin-no-barrel-files
 */
export default defineConfig([noBarrelFiles.flat]);
