import { ALLOW_LIST, DENY_LIST } from '../../naming-abbreviations';

import { functionNamingCamelCase } from './functions';
import { parameterNamingBase } from './parameters';
import { variableNamingDefault } from './variables';

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
 * These rules extend the base catch-all rules with additional banned name checking.
 * They must be placed AFTER all specific rules (destructured, const global, etc.)
 * so that specific rules take precedence.
 *
 * By extending the base rules, we ensure consistency and avoid duplicating configuration:
 * - variableAbbreviationRestriction extends variableNamingDefault
 * - functionAbbreviationRestriction extends functionNamingCamelCase
 * - parameterAbbreviationRestriction extends parameterNamingBase
 */

export const variableAbbreviationRestriction = {
  ...variableNamingDefault,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const functionAbbreviationRestriction = {
  ...functionNamingCamelCase,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const parameterAbbreviationRestriction = {
  ...parameterNamingBase,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;
