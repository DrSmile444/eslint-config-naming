import { defineConfig } from 'eslint/config';
import pluginDepend from 'eslint-plugin-depend';

/**
 * @description ESLint config for flagging dependencies that have lighter-weight alternatives.
 * E.g. suggests native Optional Chaining over lodash.get, or node:crypto over uuid for simple IDs.
 * @author Dmytro Vakulenko
 * @see https://github.com/nicolo-ribaudo/eslint-plugin-depend
 */
export default defineConfig([
  {
    name: 'depend',
    ...pluginDepend.configs['flat/recommended'],
  },
]);
