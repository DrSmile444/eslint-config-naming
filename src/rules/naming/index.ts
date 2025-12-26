import { functionAbbreviationRestriction, parameterAbbreviationRestriction, variableAbbreviationRestriction } from './abbreviations';
import { functionNamingCamelCase, functionNamingExportedOrGlobal } from './functions';
import {
  memberLikePrivateNaming,
  memberLikePrivateReadonlyNaming,
  memberLikePrivateStaticNaming,
  memberLikeProtectedNaming,
  memberLikePublicNaming,
  memberLikePublicStaticNaming,
  memberLikeReadonlyNaming,
  typePropertyReadonlyNaming,
} from './member-like';
import { objectLiteralPropertyNaming } from './object-literal-property';
import { parameterNamingBase, parameterNamingDestructured } from './parameters';
import { quotedMemberNaming } from './quoted';
import { classNaming, enumMemberNaming, enumNaming, interfaceNaming, typeLikeNaming } from './types';
import {
  booleanDestructuredVariableNaming,
  booleanVariableWithPrefixNaming,
  componentVariableNaming,
  nodeCommonVariableNaming,
  variableNamingConstGlobal,
  variableNamingDefault,
  variableNamingDestructured,
} from './variables';

export const namingConventionRule = [
  'error',
  objectLiteralPropertyNaming,
  memberLikePublicStaticNaming,
  memberLikePrivateStaticNaming,
  memberLikePrivateReadonlyNaming,
  memberLikeReadonlyNaming,
  typePropertyReadonlyNaming,
  memberLikePublicNaming,
  memberLikePrivateNaming,
  memberLikeProtectedNaming,
  parameterNamingBase,
  enumMemberNaming,
  interfaceNaming,
  classNaming,
  enumNaming,
  typeLikeNaming,
  variableNamingDestructured, // Must come before default to properly match destructured variables
  variableNamingConstGlobal,
  variableNamingDefault,
  booleanVariableWithPrefixNaming, // Requires type information - works when parserOptions.project or projectService is configured
  booleanDestructuredVariableNaming, // Requires type information - works when parserOptions.project or projectService is configured
  nodeCommonVariableNaming,
  componentVariableNaming,
  parameterNamingDestructured,
  functionNamingExportedOrGlobal,
  quotedMemberNaming, // Requires type information - works when parserOptions.project or projectService is configured
  functionNamingCamelCase,
  // Abbreviation restrictions applied last (lowest precedence) to catch common anti-patterns
  variableAbbreviationRestriction,
  functionAbbreviationRestriction,
  parameterAbbreviationRestriction,
] as const;
