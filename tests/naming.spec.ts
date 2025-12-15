import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';

import { typescriptNamingConfig } from '@configs/typescript-naming';

import classNegative from './snippets/classes/negative/class-negative.ts?url';
import classPositive from './snippets/classes/positive/class-positive.ts?url';
import enumMemberNegative from './snippets/enum-members/negative/enum-member-negative.ts?url';
import enumMemberPositive from './snippets/enum-members/positive/enum-member-positive.ts?url';
import enumNameNegative from './snippets/enum-names/negative/enum-name-negative.ts?url';
import enumNamePositive from './snippets/enum-names/positive/enum-name-positive.ts?url';
import functionCamelCaseNegative from './snippets/functions-camel-case/negative/function-camel-case-negative.ts?url';
import functionCamelCasePositive from './snippets/functions-camel-case/positive/function-camel-case-positive.ts?url';
import functionDefaultNegative from './snippets/functions-default/negative/function-default-negative.ts?url';
import functionDefaultPositive from './snippets/functions-default/positive/function-default-positive.ts?url';
import functionExportedGlobalNegative from './snippets/functions-exported-global/negative/function-exported-global-negative.ts?url';
import functionExportedGlobalPositive from './snippets/functions-exported-global/positive/function-exported-global-positive.ts?url';
import interfaceNegative from './snippets/interfaces/negative/interface-negative.ts?url';
import interfacePositive from './snippets/interfaces/positive/interface-positive.ts?url';
import memberLikePrivateNegative from './snippets/member-like-private/negative/member-like-private-negative.ts?url';
import memberLikePrivatePositive from './snippets/member-like-private/positive/member-like-private-positive.ts?url';
import memberLikePrivateReadonlyNegative from './snippets/member-like-private-readonly/negative/member-like-private-readonly-negative.ts?url';
import memberLikePrivateReadonlyPositive from './snippets/member-like-private-readonly/positive/member-like-private-readonly-positive.ts?url';
import memberLikePrivateStaticNegative from './snippets/member-like-private-static/negative/member-like-private-static-negative.ts?url';
import memberLikePrivateStaticPositive from './snippets/member-like-private-static/positive/member-like-private-static-positive.ts?url';
import memberLikeProtectedNegative from './snippets/member-like-protected/negative/member-like-protected-negative.ts?url';
import memberLikeProtectedPositive from './snippets/member-like-protected/positive/member-like-protected-positive.ts?url';
import memberLikePublicNegative from './snippets/member-like-public/negative/member-like-public-negative.ts?url';
import memberLikePublicPositive from './snippets/member-like-public/positive/member-like-public-positive.ts?url';
import memberLikePublicStaticNegative from './snippets/member-like-public-static/negative/member-like-public-static-negative.ts?url';
import memberLikePublicStaticPositive from './snippets/member-like-public-static/positive/member-like-public-static-positive.ts?url';
import objectLiteralPropertyNegative from './snippets/object-literal-properties/negative/object-literal-property-negative.ts?url';
import objectLiteralPropertyPositive from './snippets/object-literal-properties/positive/object-literal-property-positive.ts?url';
import parameterBaseNegative from './snippets/parameters-base/negative/parameter-base-negative.ts?url';
import parameterBasePositive from './snippets/parameters-base/positive/parameter-base-positive.ts?url';
import parameterDestructuredNegative from './snippets/parameters-destructured/negative/parameter-destructured-negative.ts?url';
import parameterDestructuredPositive from './snippets/parameters-destructured/positive/parameter-destructured-positive.ts?url';
import quotedMembersNegative from './snippets/quoted-members/negative/quoted-members-negative.ts?url';
import quotedMembersPositive from './snippets/quoted-members/positive/quoted-members-positive.ts?url';
import typeLikeNegative from './snippets/type-like/negative/type-like-negative.ts?url';
import typeLikePositive from './snippets/type-like/positive/type-like-positive.ts?url';
import variableBooleanDestructuredNegative from './snippets/variables-boolean-destructured/negative/variable-boolean-destructured-negative.ts?url';
import variableBooleanDestructuredPositive from './snippets/variables-boolean-destructured/positive/variable-boolean-destructured-positive.ts?url';
import variableBooleanPrefixNegative from './snippets/variables-boolean-prefix/negative/variable-boolean-prefix-negative.ts?url';
import variableBooleanPrefixPositive from './snippets/variables-boolean-prefix/positive/variable-boolean-prefix-positive.ts?url';
import variableComponentNegative from './snippets/variables-component/negative/variable-component-negative.ts?url';
import variableComponentPositive from './snippets/variables-component/positive/variable-component-positive.ts?url';
import variableConstGlobalNegative from './snippets/variables-const-global/negative/variable-const-global-negative.ts?url';
import variableConstGlobalPositive from './snippets/variables-const-global/positive/variable-const-global-positive.ts?url';
import variableDefaultNegative from './snippets/variables-default/negative/variable-default-negative.ts?url';
import variableDefaultPositive from './snippets/variables-default/positive/variable-default-positive.ts?url';
import variableDestructuredNegative from './snippets/variables-destructured/negative/variable-destructured-negative.ts?url';
import variableDestructuredPositive from './snippets/variables-destructured/positive/variable-destructured-positive.ts?url';

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
    parser: tsParser,
    parserOptions: {
      ...config.languageOptions?.parserOptions,
      ecmaVersion: 'latest',
      sourceType: 'module',
      projectService: {
        allowDefaultProject: ['*.ts', '*.tsx'],
      },
      tsconfigRootDir,
    },
  },
  plugins: {
    // test-local plugin wiring; not exported from the library config
    '@typescript-eslint': tsPlugin,
  },
}));

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: testConfig,
});

async function lint(fileUrl: string) {
  // Convert Vite's ?url import to an absolute file path
  // Vite's ?url returns paths like "/tests/snippets/..." which are project-relative
  let filePath: string;

  if (fileUrl.startsWith('file://')) {
    filePath = fileURLToPath(fileUrl);
  } else {
    // Remove leading slash if present (Vite returns paths like "/tests/...")
    const relativePath = fileUrl.startsWith('/') ? fileUrl.slice(1) : fileUrl;

    filePath = path.resolve(tsconfigRootDir, relativePath);
  }

  // Use lintFiles instead of lintText to enable type-aware linting with projectService
  const [result] = await eslint.lintFiles([filePath]);

  return result;
}

describe('@drsmile444/eslint-config-naming / TypeScript naming', () => {
  describe('object literal properties', () => {
    describe('positive', () => {
      it('allows camelCase, snake_case and PascalCase properties', async () => {
        const result = await lint(objectLiteralPropertyPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports invalid object literal property names', async () => {
        const result = await lint(objectLiteralPropertyNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike public static', () => {
    describe('positive', () => {
      it('allows PascalCase and UPPER_CASE for public static members', async () => {
        const result = await lint(memberLikePublicStaticPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows camelCase for public static members', async () => {
        const result = await lint(memberLikePublicStaticNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike private static', () => {
    describe('positive', () => {
      it('allows PascalCase and UPPER_CASE for private static members', async () => {
        const result = await lint(memberLikePrivateStaticPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid names for private static members', async () => {
        const result = await lint(memberLikePrivateStaticNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike public', () => {
    describe('positive', () => {
      it('allows camelCase and snake_case for public instance members', async () => {
        const result = await lint(memberLikePublicPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase for public instance members', async () => {
        const result = await lint(memberLikePublicNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike private', () => {
    describe('positive', () => {
      it('allows camelCase without leading underscore for private members', async () => {
        const result = await lint(memberLikePrivatePositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows leading underscores or PascalCase for private members', async () => {
        const result = await lint(memberLikePrivateNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike private readonly', () => {
    describe('positive', () => {
      it('allows camelCase and UPPER_CASE for private readonly members', async () => {
        const result = await lint(memberLikePrivateReadonlyPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid private readonly member names', async () => {
        const result = await lint(memberLikePrivateReadonlyNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('memberLike protected', () => {
    describe('positive', () => {
      it('requires a leading underscore for protected members', async () => {
        const result = await lint(memberLikeProtectedPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports protected members without leading underscore', async () => {
        const result = await lint(memberLikeProtectedNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('parameters (base)', () => {
    describe('positive', () => {
      it('allows camelCase and snake_case parameters', async () => {
        const result = await lint(parameterBasePositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase parameters', async () => {
        const result = await lint(parameterBaseNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('enum members', () => {
    describe('positive', () => {
      it('allows UPPER_CASE enum members', async () => {
        const result = await lint(enumMemberPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports non-UPPER_CASE enum members', async () => {
        const result = await lint(enumMemberNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('interfaces', () => {
    describe('positive', () => {
      it('allows PascalCase interfaces without I/T prefix', async () => {
        const result = await lint(interfacePositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows interfaces starting with I or T', async () => {
        const result = await lint(interfaceNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('classes', () => {
    describe('positive', () => {
      it('allows PascalCase class names', async () => {
        const result = await lint(classPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows non-PascalCase class names', async () => {
        const result = await lint(classNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('enum names', () => {
    describe('positive', () => {
      it('allows singular PascalCase enum names', async () => {
        const result = await lint(enumNamePositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows pluralized enum names or those starting with I/T', async () => {
        const result = await lint(enumNameNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('typeLike (type aliases etc.)', () => {
    describe('positive', () => {
      it('allows PascalCase type aliases without I/T prefix', async () => {
        const result = await lint(typeLikePositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows type aliases starting with I or T', async () => {
        const result = await lint(typeLikeNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('variables (default)', () => {
    describe('positive', () => {
      it('allows camelCase and UPPER_CASE variables', async () => {
        const result = await lint(variableDefaultPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase variables by default', async () => {
        const result = await lint(variableDefaultNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('variables (const global)', () => {
    describe('positive', () => {
      it('allows camelCase, PascalCase and UPPER_CASE for global consts', async () => {
        const result = await lint(variableConstGlobalPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid format for global consts', async () => {
        const result = await lint(variableConstGlobalNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('variables (destructured)', () => {
    describe('positive', () => {
      it('allows destructured variables in allowed formats', async () => {
        const result = await lint(variableDestructuredPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid destructured variable names', async () => {
        const result = await lint(variableDestructuredNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('boolean variables with prefix', () => {
    describe('positive', () => {
      it('requires allowed prefixes for boolean variables', async () => {
        const result = await lint(variableBooleanPrefixPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('reports boolean variables without proper prefixes', async () => {
        const result = await lint(variableBooleanPrefixNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('boolean variables (destructured)', () => {
    describe('positive', () => {
      it('allows any naming for destructured boolean variables', async () => {
        const result = await lint(variableBooleanDestructuredPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('still enforces prefixes for non-destructured boolean variables', async () => {
        const result = await lint(variableBooleanDestructuredNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('component variables', () => {
    describe('positive', () => {
      it('allows PascalCase for *Component variables', async () => {
        const result = await lint(variableComponentPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows non-PascalCase *Component variables', async () => {
        const result = await lint(variableComponentNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('parameters (destructured)', () => {
    describe('positive', () => {
      it('allows destructured parameters in allowed formats', async () => {
        const result = await lint(parameterDestructuredPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid destructured parameter names', async () => {
        const result = await lint(parameterDestructuredNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('functions (default)', () => {
    describe('positive', () => {
      it('allows camelCase local function names', async () => {
        const result = await lint(functionDefaultPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows PascalCase local function names', async () => {
        const result = await lint(functionDefaultNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('functions (exported/global)', () => {
    describe('positive', () => {
      it('allows camelCase and PascalCase for exported global functions', async () => {
        const result = await lint(functionExportedGlobalPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows invalid exported/global function names', async () => {
        const result = await lint(functionExportedGlobalNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('quoted members', () => {
    describe('positive', () => {
      it('ignores members that require quotes', async () => {
        const result = await lint(quotedMembersPositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('still reports invalid unquoted member names', async () => {
        const result = await lint(quotedMembersNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });

  describe('functions (camelCase only)', () => {
    describe('positive', () => {
      it('allows camelCase function names', async () => {
        const result = await lint(functionCamelCasePositive);

        expect(result.errorCount).toBe(0);
      });
    });

    describe('negative', () => {
      it('disallows snake_case function names', async () => {
        const result = await lint(functionCamelCaseNegative);

        expect(result.errorCount).toBeGreaterThan(0);
      });
    });
  });
});
