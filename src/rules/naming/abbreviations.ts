import { ALLOW_LIST, DENY_LIST } from '../../naming-abbreviations';

import { functionNamingCamelCase } from './functions';
import {
  memberLikePrivateNaming,
  memberLikePrivateReadonlyNaming,
  memberLikePrivateStaticNaming,
  memberLikeProtectedNaming,
  memberLikePublicNaming,
  memberLikePublicStaticNaming,
  memberLikeReadonlyNaming,
} from './member-like';
import { parameterNamingBase } from './parameters';
import { variableNamingConstGlobal, variableNamingDefault } from './variables';

/**
 * Escape special regex characters in a string.
 * @param string - Input string to escape.
 * @returns Escaped string safe for use in a RegExp constructor.
 */
function escapeRegex(string: string): string {
  return string.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

/**
 * Generate a regex pattern that matches banned abbreviations.
 * Filters out any abbreviations that are in the ALLOW_LIST.
 * @returns Regex pattern string matching banned names.
 */
function generateBannedNamesRegex(): string {
  const denyListKeys = Object.keys(DENY_LIST);
  const effectiveDenyNames = denyListKeys.filter((name) => !ALLOW_LIST.includes(name));

  return `^(${effectiveDenyNames.map((name) => escapeRegex(name)).join('|')})$`;
}

const bannedNamesRegex = generateBannedNamesRegex();

/**
 * Rules that ban abbreviations from DENY_LIST (except those in ALLOW_LIST)
 * for variables, functions, parameters, and member-like properties.
 *
 * These rules extend the base catch-all rules with additional banned name checking.
 * They must be placed AFTER all specific rules (destructured, const global, etc.)
 * so that specific rules take precedence.
 *
 * By extending the base rules, we ensure consistency and avoid duplicating configuration:
 * - variableConstGlobalAbbreviationRestriction extends variableNamingConstGlobal
 * - variableAbbreviationRestriction extends variableNamingDefault
 * - functionAbbreviationRestriction extends functionNamingCamelCase
 * - parameterAbbreviationRestriction extends parameterNamingBase
 * - memberLike*AbbreviationRestriction extends corresponding memberLike rules
 */

export const variableConstGlobalAbbreviationRestriction = {
  ...variableNamingConstGlobal,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

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

// Member-like abbreviation restrictions
export const memberLikePublicStaticAbbreviationRestriction = {
  ...memberLikePublicStaticNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const memberLikePrivateStaticAbbreviationRestriction = {
  ...memberLikePrivateStaticNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const memberLikePrivateReadonlyAbbreviationRestriction = {
  ...memberLikePrivateReadonlyNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const memberLikeReadonlyAbbreviationRestriction = {
  ...memberLikeReadonlyNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const memberLikePublicAbbreviationRestriction = {
  ...memberLikePublicNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const memberLikePrivateAbbreviationRestriction = {
  ...memberLikePrivateNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;

export const memberLikeProtectedAbbreviationRestriction = {
  ...memberLikeProtectedNaming,
  custom: {
    regex: bannedNamesRegex,
    match: false,
  },
} as const;
