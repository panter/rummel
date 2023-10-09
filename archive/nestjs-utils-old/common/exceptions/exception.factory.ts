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

export const exceptionFactory = (validationErrors: ValidationError[]) => {
  const errorsFormatted: UerInputErrorExtensions = { fieldErrors: {} };

  const formatErrors = (
    errors: ValidationError[],
    errorsFormattedMap: ErrorsMap,
  ) => {
    errors.forEach(({ property, constraints, children, contexts }) => {
      if (children?.length === 0 && constraints) {
        errorsFormattedMap[property] = {};
        Object.keys(constraints).forEach((constraint) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          errorsFormattedMap[property].push({
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
