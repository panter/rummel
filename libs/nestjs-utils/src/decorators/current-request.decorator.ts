import { createParamDecorator } from '@nestjs/common';
import { getRequest } from '../graphql';

export const CurrentRequest = createParamDecorator(
  (data: string, context: any) => {
    const request: any = getRequest(context);
    return data ? request?.[data] : request;
  },
);
