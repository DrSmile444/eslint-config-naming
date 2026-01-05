import { functionAbbreviationRestriction, parameterAbbreviationRestriction, variableAbbreviationRestriction } from './abbreviations';
import { functionNamingExportedOrGlobal } from './functions';
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
import { parameterNamingDestructured } from './parameters';
import { quotedMemberNaming } from './quoted';
import { classNaming, enumMemberNaming, enumNaming, interfaceNaming, typeLikeNaming, typeParameterNaming } from './types';
import {
  booleanDestructuredVariableNaming,
  booleanVariableWithPrefixNaming,
  componentVariableNaming,
  nodeCommonVariableNaming,
  variableNamingConstGlobal,
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
  enumMemberNaming,
  interfaceNaming,
  classNaming,
  enumNaming,
  typeParameterNaming,
  typeLikeNaming,
  variableNamingDestructured, // Must come before default to properly match destructured variables
  variableNamingConstGlobal,
  booleanVariableWithPrefixNaming, // Requires type information - works when parserOptions.project or projectService is configured
  booleanDestructuredVariableNaming, // Requires type information - works when parserOptions.project or projectService is configured
  nodeCommonVariableNaming,
  componentVariableNaming,
  parameterNamingDestructured,
  functionNamingExportedOrGlobal,
  quotedMemberNaming, // Requires type information - works when parserOptions.project or projectService is configured
  // Abbreviation restrictions act as catch-all rules with additional banned name checks
  // They replace the previous catch-all rules (variableNamingDefault, parameterNamingBase, functionNamingCamelCase)
  variableAbbreviationRestriction,
  functionAbbreviationRestriction,
  parameterAbbreviationRestriction,
] as const;
