import { ApolloError } from '@apollo/client';
import { UseFormSetError } from 'react-hook-form';
import { TFunction } from 'next-i18next';

export const VALIDATION_ERROR_CODE = `BAD_USER_INPUT`;

type FieldError = {
  constraint: string;
  message: string;
  context: Record<string, any>;
};

type TranslatedFieldErrors = Record<string, string[]>;

const translateFieldError = (fieldError: FieldError, t: TFunction): string => {
  switch (fieldError.constraint) {
    case 'min': {
      const minLength = fieldError.context.minLength;
      if (minLength === undefined) {
        return fieldError.message;
      }
      const message = t('validation.constraints.minLength', {
        count: minLength,
      });
      return message || fieldError.message;
    }
    default:
      return fieldError.message;
  }
};

export const getErrorCode = (error: ApolloError) =>
  error.graphQLErrors['0']?.extensions.code;

export const translatedFieldErrors = (
  error: ApolloError,
  t: TFunction,
): Record<string, string[]> | undefined => {
  const code = getErrorCode(error);
  const isValidationError = code === VALIDATION_ERROR_CODE;
  if (!isValidationError) {
    return;
  }
  const fieldErrors = error.graphQLErrors['0'].extensions.fieldErrors as Record<
    string,
    FieldError[]
  >;
  if (!Object.keys(fieldErrors)?.length) return;
  const translatedFieldErrors: Record<string, string[]> = {};
  for (const field of Object.keys(fieldErrors)) {
    translatedFieldErrors[field] = [];
    for (const fieldError of fieldErrors[field]) {
      translatedFieldErrors[field].push(translateFieldError(fieldError, t));
    }
  }

  return translatedFieldErrors;
};

export const getTranslatedFieldError = (
  field: string,
  errors: TranslatedFieldErrors,
): string | undefined => {
  return errors[field]?.join('\n');
};

export const handleFormError = (
  error: ApolloError,
  options: { setError: UseFormSetError<any>; t: TFunction },
) => {
  const code = getErrorCode(error);
  const isValidationError = code === VALIDATION_ERROR_CODE;
  if (isValidationError) {
    const fieldsErrors = error.graphQLErrors['0'].extensions
      .fieldErrors as Record<string, FieldError[]>;
    setInputErrorsRecursively(fieldsErrors, [], options);
  }
};

export const setInputErrorsRecursively = (
  errorsMap: any,
  currentPath: string[] = [],
  options: {
    setError: UseFormSetError<any>;
    t: TFunction;
  },
) => {
  for (const key in errorsMap) {
    const value = errorsMap[key];
    const newPath = [...currentPath, key];

    if (Array.isArray(value)) {
      value.forEach((error: any) => {
        options.setError(newPath.join('.'), {
          type: 'custom',
          message: translateFieldError(error, options.t),
        });
      });
    } else if (typeof value === 'object') {
      setInputErrorsRecursively(value as any, newPath, options);
    } else {
      options.setError(newPath.join('.'), {
        type: 'custom',
        message: translateFieldError(value, options.t),
      });
    }
  }
};
