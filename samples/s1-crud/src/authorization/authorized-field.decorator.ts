import { applyDecorators } from '@nestjs/common';
import { Extensions, Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { authorizedFieldMiddleware } from './authorized-field.middleware';

type AuthorizedFieldOptions = FieldOptions & {
  /**
   * Check if current user has one of listed roles
   */
  roles?: string[];
  /**
   * Check if requested resource is owned by currently logged-in user
   */
  checkOwner?: boolean;
  returnTypeFunction?: ReturnTypeFunc;
};

export function AuthorizedField(param?: AuthorizedFieldOptions) {
  const { roles, checkOwner, returnTypeFunction, ...fieldParams } = param || {};
  const fieldOptions = {
    ...(fieldParams || {}),
    middleware: [authorizedFieldMiddleware],
    nullable: true, //always make nullable if we hide for not authorized
  };

  return applyDecorators(
    returnTypeFunction ? Field(returnTypeFunction, fieldOptions) : Field(fieldOptions),
    Extensions({ roles, checkOwner }),
  );
}
