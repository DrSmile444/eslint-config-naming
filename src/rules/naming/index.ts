import { functionNamingCamelCase, functionNamingExportedOrGlobal } from './functions';
import {
  memberLikePrivateNaming,
  memberLikePrivateReadonlyNaming,
  memberLikePrivateStaticNaming,
  memberLikeProtectedNaming,
  memberLikePublicNaming,
  memberLikePublicStaticNaming,
} from './member-like';
import { objectLiteralPropertyNaming } from './object-literal-property';
import { parameterNamingBase, parameterNamingDestructured } from './parameters';
import { quotedMemberNaming } from './quoted';
import { classNaming, enumMemberNaming, enumNaming, interfaceNaming, typeLikeNaming } from './types';
import {
  booleanDestructuredVariableNaming,
  booleanVariableWithPrefixNaming,
  componentVariableNaming,
  variableNamingConstGlobal,
  variableNamingDefault,
  variableNamingDestructured,
} from './variables';

export const namingConventionRule = [
  'error',
  objectLiteralPropertyNaming,
  memberLikePublicStaticNaming,
  memberLikePrivateStaticNaming,
  memberLikePublicNaming,
  memberLikePrivateNaming,
  memberLikePrivateReadonlyNaming,
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
  componentVariableNaming,
  parameterNamingDestructured,
  functionNamingExportedOrGlobal,
  quotedMemberNaming, // Requires type information - works when parserOptions.project or projectService is configured
  functionNamingCamelCase,
] as const;
