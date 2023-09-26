import { createParamDecorator } from '@nestjs/common';
import { getRequest } from './utils';

export const CurrentUser = createParamDecorator(
  (data: string, context: any) => {
    const request: any = getRequest(context);
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
