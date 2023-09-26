import { ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const getRequest = (context: ExecutionContext): Request => {
  if (context.getType<GqlContextType>() === 'graphql') {
    const ctx = GqlExecutionContext.create(context).getContext();
    return <Request>ctx.req;
  }

  return context.switchToHttp().getRequest<Request>();
};
