import { ValidationError } from '@nestjs/common';
import { exceptionFactory } from './exception.factory';

describe('ExceptionFactory', () => {
  const validationErrors: ValidationError[] = [
    {
      property: 'name',
      constraints: {
        isNotEmpty: 'name should not be empty',
      },
      children: [],
      contexts: {},
    },
  ];

  it('should return a GraphQLError when ValidationError is provided', () => {
    const res = exceptionFactory(validationErrors);

    expect(res).toBeDefined();
    expect(res.message).toEqual('Input error');
    expect(res.extensions).toBeDefined();
    expect(res.extensions.code).toEqual('BAD_USER_INPUT');
    expect(res.extensions.fieldErrors).toEqual({
      name: [
        {
          constraint: 'isNotEmpty',
          message: 'name should not be empty',
          context: undefined,
        },
      ],
    });
  });
});
