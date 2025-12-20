import type { Linter } from 'eslint';

import { typescriptNamingConfig } from './configs/typescript-naming';

const config: Linter.Config[] = typescriptNamingConfig;

export default config;

export { typescriptNamingConfig } from './configs/typescript-naming';

export { namingConventionRule } from './rules/naming';

export { legacyEslintrcConfig } from './legacy';

export type { Linter } from 'eslint';
