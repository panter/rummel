import { ValidationError } from '@nestjs/common';
import { GraphQLError } from 'graphql/error';
import { ApolloServerErrorCode } from '@apollo/server/errors';

type FieldErrors = {
  constraint: string;
  message: string;
  context: Record<string, any>;
}[];

type ErrorsMap = {
  [key: string]: FieldErrors | ErrorsMap;
};

type UerInputErrorExtensions = {
  code?: string;
  genericErrorKey?: string;
  fieldErrors: ErrorsMap;
};

/**
 * Recursively format validation errors into a GraphQL error
 * @param validationErrors - NestJS validation errors (class-validator)
 * returns a GraphQL error - GraphQLError with validation errors in extensions
 *
 * Extensions are formatted as follows:
 * ```
 * {
 *  code: 'BAD_USER_INPUT',
 *  fieldErrors: {
 *  field1: [
 *    { constraint: 'constraint1', message: 'message1', context: { ... } },
 *    { constraint: 'constraint2', message: 'message2', context: { ... } },
 *  ],
 * ```
 */
export const exceptionFactory = (validationErrors: ValidationError[]) => {
  const errorsFormatted: UerInputErrorExtensions = { fieldErrors: {} };

  const formatErrors = (
    errors: ValidationError[],
    errorsFormattedMap: ErrorsMap,
  ) => {
    errors.forEach(({ property, constraints, children, contexts }) => {
      if (children?.length === 0 && constraints) {
        errorsFormattedMap[property] = [];
        Object.keys(constraints).forEach((constraint) => {
          (errorsFormattedMap[property] as FieldErrors).push({
            constraint,
            message: constraints[constraint],
            context: contexts?.[constraint],
          });
        });
      } else if (children) {
        errorsFormattedMap[property] = {} as ErrorsMap;
        formatErrors(children, errorsFormattedMap[property] as ErrorsMap);
      }
    });
  };

  formatErrors(validationErrors, errorsFormatted.fieldErrors);

  return new GraphQLError('Input error', {
    extensions: {
      code: ApolloServerErrorCode.BAD_USER_INPUT,
      fieldErrors: errorsFormatted.fieldErrors,
    },
  });
};
