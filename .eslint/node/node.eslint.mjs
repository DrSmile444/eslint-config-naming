import airbnbBase from 'eslint-config-airbnb-base';

import { compat } from '../eslint-compat.config.mjs';

/**
 * @description ESLint config for Node.js code. Applies Airbnb base style and disables class-methods-use-this rule.
 * @author Dmytro Vakulenko
 * @see https://github.com/airbnb/javascript
 */
export default [
  ...compat.config(airbnbBase),
  {
    name: 'node',
    rules: {
      'class-methods-use-this': 'off',
      'import/order': 'off',
    },
  },
];
