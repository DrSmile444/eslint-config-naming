import { functionNamingCamelCase, functionNamingDefaultPascalOrCamel, functionNamingExportedOrGlobal } from './functions';
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

// This array preserves the exact rule ordering from the original legacy config.
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
  variableNamingDefault,
  variableNamingConstGlobal,
  variableNamingDestructured,
  booleanVariableWithPrefixNaming,
  booleanDestructuredVariableNaming,
  componentVariableNaming,
  parameterNamingDestructured,
  functionNamingDefaultPascalOrCamel,
  functionNamingExportedOrGlobal,
  quotedMemberNaming,
  functionNamingCamelCase,
] as const;
