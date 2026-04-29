import namingEslint from './naming.eslint.mjs';
import overridesEslint from './overrides.eslint.mjs';
import overridesTestEslint from './overrides-test.eslint.mjs';
import { createProjectConfig } from './project.eslint.mjs';
import tseslintRulesEslint from './tseslint-rules.eslint.mjs';

/**
 * Aggregated TypeScript-specific ESLint configs. All rules here
 * only apply to TypeScript files (*.ts, *.tsx, *.mts, *.cts).
 * Remove this import from node.eslint.mjs to switch to a JavaScript-only configuration.
 * @param {{ rootDir?: string, tsconfig?: string, scriptstsconfig?: string }} [options]
 * @returns {import('typescript-eslint').ConfigArray}
 * @author Dmytro Vakulenko
 */
export function createTypescriptConfig(options = {}) {
  return [...tseslintRulesEslint, ...namingEslint, ...overridesEslint, ...overridesTestEslint, ...createProjectConfig(options)];
}

export default createTypescriptConfig();
