import { defineConfig } from 'eslint/config';
import airbnbBase from 'eslint-config-airbnb-base';

import { compat } from '../eslint-compat.config.mjs';

/**
 * @description Airbnb base style for Node.js via FlatCompat, with modern overrides.
 * @author Dmytro Vakulenko
 * @see https://github.com/airbnb/javascript
 */
export default defineConfig([
  ...compat.config(airbnbBase),
  {
    name: 'airbnb-base/overrides',
    rules: {
      'class-methods-use-this': 'off',
      'import/order': 'off',
      // for...of restriction was added when Babel + regenerator-runtime added significant bundle weight.
      // Node 22 and modern TS targets emit native for...of — the concern no longer applies.
      'no-restricted-syntax': 'off',
    },
  },
  {
    name: 'airbnb-base/restricted-syntax',
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
      ],
    },
  },
]);
