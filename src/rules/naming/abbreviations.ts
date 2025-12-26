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
 * These rules are applied LAST (lowest precedence) so that specific rules
 * (like destructured variables, boolean prefixes, etc.) can take precedence.
 * They act as a final safety net to catch common anti-patterns.
 *
 * Note: format: null allows any format, we only check against the custom regex.
 */

export const variableAbbreviationRestriction = {
  selector: 'variable',
  format: null,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const functionAbbreviationRestriction = {
  selector: 'function',
  format: null,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const parameterAbbreviationRestriction = {
  selector: 'parameter',
  format: null,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;
