import { createParamDecorator } from '@nestjs/common';
import { getRequest } from '../graphql';

export const CurrentUser = createParamDecorator(
  (data: string, context: any) => {
    const request: any = getRequest(context);
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
