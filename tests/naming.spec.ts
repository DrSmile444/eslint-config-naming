import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

import { typescriptNamingConfig } from '@configs/typescript-naming';

import classNegative from './snippets/classes/negative/class-negative.ts?raw';
import enumMemberNegative from './snippets/enum-members/negative/enum-member-negative.ts?raw';
import enumNameNegative from './snippets/enum-names/negative/enum-name-negative.ts?raw';
import functionCamelCaseNegative from './snippets/functions-camel-case/negative/function-camel-case-negative.ts?raw';
import functionDefaultNegative from './snippets/functions-default/negative/function-default-negative.ts?raw';
import functionExportedGlobalNegative from './snippets/functions-exported-global/negative/function-exported-global-negative.ts?raw';
import interfaceNegative from './snippets/interfaces/negative/interface-negative.ts?raw';
import memberLikePrivateNegative from './snippets/member-like-private/negative/member-like-private-negative.ts?raw';
import memberLikePrivateReadonlyNegative from './snippets/member-like-private-readonly/negative/member-like-private-readonly-negative.ts?raw';
import memberLikePrivateStaticNegative from './snippets/member-like-private-static/negative/member-like-private-static-negative.ts?raw';
import memberLikeProtectedNegative from './snippets/member-like-protected/negative/member-like-protected-negative.ts?raw';
import memberLikePublicNegative from './snippets/member-like-public/negative/member-like-public-negative.ts?raw';
import memberLikePublicStaticNegative from './snippets/member-like-public-static/negative/member-like-public-static-negative.ts?raw';
import objectLiteralPropertyNegative from './snippets/object-literal-properties/negative/object-literal-property-negative.ts?raw';
import parameterBaseNegative from './snippets/parameters-base/negative/parameter-base-negative.ts?raw';
import parameterDestructuredNegative from './snippets/parameters-destructured/negative/parameter-destructured-negative.ts?raw';
import quotedMembersNegative from './snippets/quoted-members/negative/quoted-members-negative.ts?raw';
import typeLikeNegative from './snippets/type-like/negative/type-like-negative.ts?raw';
import variableBooleanDestructuredNegative from './snippets/variables-boolean-destructured/negative/variable-boolean-destructured-negative.ts?raw';
import variableBooleanPrefixNegative from './snippets/variables-boolean-prefix/negative/variable-boolean-prefix-negative.ts?raw';
import variableComponentNegative from './snippets/variables-component/negative/variable-component-negative.ts?raw';
import variableConstGlobalNegative from './snippets/variables-const-global/negative/variable-const-global-negative.ts?raw';
import variableDefaultNegative from './snippets/variables-default/negative/variable-default-negative.ts?raw';
import variableDestructuredNegative from './snippets/variables-destructured/negative/variable-destructured-negative.ts?raw';
import classPositive from './snippets/classes/positive/class-positive.ts?raw';
import enumMemberPositive from './snippets/enum-members/positive/enum-member-positive.ts?raw';
import enumNamePositive from './snippets/enum-names/positive/enum-name-positive.ts?raw';
import functionCamelCasePositive from './snippets/functions-camel-case/positive/function-camel-case-positive.ts?raw';
import functionDefaultPositive from './snippets/functions-default/positive/function-default-positive.ts?raw';
import functionExportedGlobalPositive from './snippets/functions-exported-global/positive/function-exported-global-positive.ts?raw';
import interfacePositive from './snippets/interfaces/positive/interface-positive.ts?raw';
import memberLikePrivatePositive from './snippets/member-like-private/positive/member-like-private-positive.ts?raw';
import memberLikePrivateReadonlyPositive from './snippets/member-like-private-readonly/positive/member-like-private-readonly-positive.ts?raw';
import memberLikePrivateStaticPositive from './snippets/member-like-private-static/positive/member-like-private-static-positive.ts?raw';
import memberLikeProtectedPositive from './snippets/member-like-protected/positive/member-like-protected-positive.ts?raw';
import memberLikePublicPositive from './snippets/member-like-public/positive/member-like-public-positive.ts?raw';
import memberLikePublicStaticPositive from './snippets/member-like-public-static/positive/member-like-public-static-positive.ts?raw';
import objectLiteralPropertyPositive from './snippets/object-literal-properties/positive/object-literal-property-positive.ts?raw';
import parameterBasePositive from './snippets/parameters-base/positive/parameter-base-positive.ts?raw';
import parameterDestructuredPositive from './snippets/parameters-destructured/positive/parameter-destructured-positive.ts?raw';
import quotedMembersPositive from './snippets/quoted-members/positive/quoted-members-positive.ts?raw';
import typeLikePositive from './snippets/type-like/positive/type-like-positive.ts?raw';
import variableBooleanDestructuredPositive from './snippets/variables-boolean-destructured/positive/variable-boolean-destructured-positive.ts?raw';
import variableBooleanPrefixPositive from './snippets/variables-boolean-prefix/positive/variable-boolean-prefix-positive.ts?raw';
import variableComponentPositive from './snippets/variables-component/positive/variable-component-positive.ts?raw';
import variableConstGlobalPositive from './snippets/variables-const-global/positive/variable-const-global-positive.ts?raw';
import variableDefaultPositive from './snippets/variables-default/positive/variable-default-positive.ts?raw';
import variableDestructuredPositive from './snippets/variables-destructured/positive/variable-destructured-positive.ts?raw';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const tsconfigRootDir = path.resolve(__dirname, '..');

// Build a test-only config that wires parser + plugin in, while the published
// config stays parser- and plugin-agnostic.
const testConfig = typescriptNamingConfig.map((config) => ({
  ...config,
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    ...config.languageOptions,
    parser: tsParser as any,
    parserOptions: {
      ...config.languageOptions?.parserOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      // Note: project-based linting doesn't work well with lintText + virtual files
      // so we disable it for tests. Type-aware rules won't fully work, but
      // non-type-aware naming convention rules will still be tested.
    },
  },
  plugins: {
    // test-local plugin wiring; not exported from the library config
    '@typescript-eslint': tsPlugin as any,
  },
}));

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: testConfig,
});

async function lint(code: string, relativePath: string) {
  const filePath = path.resolve(tsconfigRootDir, relativePath);
  const [result] = await eslint.lintText(code, { filePath });

  return result;
}

describe('@drsmile444/eslint-config-naming / TypeScript naming', () => {
  describe('object literal properties', () => {
    describe('positive', () => {
      it('allows camelCase, snake_case and PascalCase properties', async () => {
        const result = await lint(objectLiteralPropertyPositive, 'tests/snippets/positive/object-literal-property-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports invalid object literal property names', async () => {
        const result = await lint(objectLiteralPropertyNegative, 'tests/snippets/negative/object-literal-property-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike public static', () => {
    describe('positive', () => {
      it('allows PascalCase and UPPER_CASE for public static members', async () => {
        const result = await lint(memberLikePublicStaticPositive, 'tests/snippets/positive/member-like-public-static-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows camelCase for public static members', async () => {
        const result = await lint(memberLikePublicStaticNegative, 'tests/snippets/negative/member-like-public-static-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike private static', () => {
    describe('positive', () => {
      it('allows PascalCase and UPPER_CASE for private static members', async () => {
        const result = await lint(memberLikePrivateStaticPositive, 'tests/snippets/positive/member-like-private-static-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid names for private static members', async () => {
        const result = await lint(memberLikePrivateStaticNegative, 'tests/snippets/negative/member-like-private-static-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike public', () => {
    describe('positive', () => {
      it('allows camelCase and snake_case for public instance members', async () => {
        const result = await lint(memberLikePublicPositive, 'tests/snippets/positive/member-like-public-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase for public instance members', async () => {
        const result = await lint(memberLikePublicNegative, 'tests/snippets/negative/member-like-public-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike private', () => {
    describe('positive', () => {
      it('allows camelCase without leading underscore for private members', async () => {
        const result = await lint(memberLikePrivatePositive, 'tests/snippets/positive/member-like-private-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows leading underscores or PascalCase for private members', async () => {
        const result = await lint(memberLikePrivateNegative, 'tests/snippets/negative/member-like-private-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike private readonly', () => {
    describe('positive', () => {
      it('allows camelCase and UPPER_CASE for private readonly members', async () => {
        const result = await lint(memberLikePrivateReadonlyPositive, 'tests/snippets/positive/member-like-private-readonly-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid private readonly member names', async () => {
        const result = await lint(memberLikePrivateReadonlyNegative, 'tests/snippets/negative/member-like-private-readonly-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike protected', () => {
    describe('positive', () => {
      it('requires a leading underscore for protected members', async () => {
        const result = await lint(memberLikeProtectedPositive, 'tests/snippets/positive/member-like-protected-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports protected members without leading underscore', async () => {
        const result = await lint(memberLikeProtectedNegative, 'tests/snippets/negative/member-like-protected-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('parameters (base)', () => {
    describe('positive', () => {
      it('allows camelCase and snake_case parameters', async () => {
        const result = await lint(parameterBasePositive, 'tests/snippets/positive/parameter-base-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase parameters', async () => {
        const result = await lint(parameterBaseNegative, 'tests/snippets/negative/parameter-base-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('enum members', () => {
    describe('positive', () => {
      it('allows UPPER_CASE enum members', async () => {
        const result = await lint(enumMemberPositive, 'tests/snippets/positive/enum-member-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports non-UPPER_CASE enum members', async () => {
        const result = await lint(enumMemberNegative, 'tests/snippets/negative/enum-member-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('interfaces', () => {
    describe('positive', () => {
      it('allows PascalCase interfaces without I/T prefix', async () => {
        const result = await lint(interfacePositive, 'tests/snippets/positive/interface-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows interfaces starting with I or T', async () => {
        const result = await lint(interfaceNegative, 'tests/snippets/negative/interface-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('classes', () => {
    describe('positive', () => {
      it('allows PascalCase class names', async () => {
        const result = await lint(classPositive, 'tests/snippets/positive/class-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows non-PascalCase class names', async () => {
        const result = await lint(classNegative, 'tests/snippets/negative/class-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('enum names', () => {
    describe('positive', () => {
      it('allows singular PascalCase enum names', async () => {
        const result = await lint(enumNamePositive, 'tests/snippets/positive/enum-name-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows pluralized enum names or those starting with I/T', async () => {
        const result = await lint(enumNameNegative, 'tests/snippets/negative/enum-name-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('typeLike (type aliases etc.)', () => {
    describe('positive', () => {
      it('allows PascalCase type aliases without I/T prefix', async () => {
        const result = await lint(typeLikePositive, 'tests/snippets/positive/type-like-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows type aliases starting with I or T', async () => {
        const result = await lint(typeLikeNegative, 'tests/snippets/negative/type-like-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('variables (default)', () => {
    describe('positive', () => {
      it('allows camelCase and UPPER_CASE variables', async () => {
        const result = await lint(variableDefaultPositive, 'tests/snippets/positive/variable-default-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase variables by default', async () => {
        const result = await lint(variableDefaultNegative, 'tests/snippets/negative/variable-default-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('variables (const global)', () => {
    describe('positive', () => {
      it('allows camelCase, PascalCase and UPPER_CASE for global consts', async () => {
        const result = await lint(variableConstGlobalPositive, 'tests/snippets/positive/variable-const-global-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid format for global consts', async () => {
        const result = await lint(variableConstGlobalNegative, 'tests/snippets/negative/variable-const-global-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('variables (destructured)', () => {
    describe('positive', () => {
      it('allows destructured variables in allowed formats', async () => {
        const result = await lint(variableDestructuredPositive, 'tests/snippets/positive/variable-destructured-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid destructured variable names', async () => {
        const result = await lint(variableDestructuredNegative, 'tests/snippets/negative/variable-destructured-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('boolean variables with prefix', () => {
    describe('positive', () => {
      it('requires allowed prefixes for boolean variables', async () => {
        const result = await lint(variableBooleanPrefixPositive, 'tests/snippets/positive/variable-boolean-prefix-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports boolean variables without proper prefixes', async () => {
        const result = await lint(variableBooleanPrefixNegative, 'tests/snippets/negative/variable-boolean-prefix-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('boolean variables (destructured)', () => {
    describe('positive', () => {
      it('allows any naming for destructured boolean variables', async () => {
        const result = await lint(variableBooleanDestructuredPositive, 'tests/snippets/positive/variable-boolean-destructured-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('still enforces prefixes for non-destructured boolean variables', async () => {
        const result = await lint(variableBooleanDestructuredNegative, 'tests/snippets/negative/variable-boolean-destructured-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('component variables', () => {
    describe('positive', () => {
      it('allows PascalCase for *Component variables', async () => {
        const result = await lint(variableComponentPositive, 'tests/snippets/positive/variable-component-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows non-PascalCase *Component variables', async () => {
        const result = await lint(variableComponentNegative, 'tests/snippets/negative/variable-component-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('parameters (destructured)', () => {
    describe('positive', () => {
      it('allows destructured parameters in allowed formats', async () => {
        const result = await lint(parameterDestructuredPositive, 'tests/snippets/positive/parameter-destructured-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid destructured parameter names', async () => {
        const result = await lint(parameterDestructuredNegative, 'tests/snippets/negative/parameter-destructured-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('functions (default)', () => {
    describe('positive', () => {
      it('allows camelCase local function names', async () => {
        const result = await lint(functionDefaultPositive, 'tests/snippets/positive/function-default-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase local function names', async () => {
        const result = await lint(functionDefaultNegative, 'tests/snippets/negative/function-default-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('functions (exported/global)', () => {
    describe('positive', () => {
      it('allows camelCase and PascalCase for exported global functions', async () => {
        const result = await lint(functionExportedGlobalPositive, 'tests/snippets/positive/function-exported-global-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid exported/global function names', async () => {
        const result = await lint(functionExportedGlobalNegative, 'tests/snippets/negative/function-exported-global-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('quoted members', () => {
    describe('positive', () => {
      it('ignores members that require quotes', async () => {
        const result = await lint(quotedMembersPositive, 'tests/snippets/positive/quoted-members-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('still reports invalid unquoted member names', async () => {
        const result = await lint(quotedMembersNegative, 'tests/snippets/negative/quoted-members-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('functions (camelCase only)', () => {
    describe('positive', () => {
      it('allows camelCase function names', async () => {
        const result = await lint(functionCamelCasePositive, 'tests/snippets/positive/function-camel-case-positive.ts');

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows snake_case function names', async () => {
        const result = await lint(functionCamelCaseNegative, 'tests/snippets/function-camel-case/negative/function-camel-case-negative.ts');

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });
});
