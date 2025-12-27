import { ALLOW_LIST, DENY_LIST } from '../../naming-abbreviations';

/**
 * Escape special regex characters in a string
 */
function escapeRegex(string: string): string {
  return string.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

/**
 * Generate a regex pattern that matches banned abbreviations.
 * We filter out any abbreviations that are in the ALLOW_LIST.
 */
function generateBannedNamesRegex(): string {
  const denyListKeys = Object.keys(DENY_LIST);
  const effectiveDenyNames = denyListKeys.filter((name) => !ALLOW_LIST.includes(name));

  return `^(${effectiveDenyNames.map((name) => escapeRegex(name)).join('|')})$`;
}

const bannedNamesRegex = generateBannedNamesRegex();

/**
 * Rules that ban abbreviations from DENY_LIST (except those in ALLOW_LIST)
 * for variables, functions, and parameters.
 *
 * These rules act as catch-all rules with additional banned name checking.
 * They must be placed AFTER all specific rules (destructured, const global, etc.)
 * so that specific rules take precedence.
 *
 * They REPLACE the previous catch-all rules (variableNamingDefault, parameterNamingBase,
 * functionNamingCamelCase) and provide the same format restrictions plus custom regex
 * validation against banned abbreviations.
 *
 * Format restrictions:
 * - variables: camelCase, UPPER_CASE (same as variableNamingDefault)
 * - functions: camelCase only (same as functionNamingCamelCase)
 * - parameters: camelCase with leading underscore allowed (same as parameterNamingBase)
 */

export const variableAbbreviationRestriction = {
  selector: 'variable',
  format: ['camelCase', 'UPPER_CASE'],
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const functionAbbreviationRestriction = {
  selector: 'function',
  format: ['camelCase'],
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const parameterAbbreviationRestriction = {
  selector: 'parameter',
  format: ['camelCase'],
  leadingUnderscore: 'allow',
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;
