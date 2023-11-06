import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import * as process from 'process';

const logger = new Logger('AuthenticatedFieldMiddleware');
const debug = process.env.DEBUG_AUTHENTICATED_FIELD_MIDDLEWARE;

const log = (message: string) => {
  if (debug) {
    logger.debug(message);
  }
};

export const authorizedFieldMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const { info } = ctx;
  const { extensions } = info.parentType.getFields()[info.fieldName];
  const requiredRoles: string[] = (extensions.roles as string[]) || [];
  const checkOwner = extensions.checkOwner;
  const user = ctx.context.req.user;
  const userRole = user?.role?.name;
  if ((!requiredRoles.length && !checkOwner) || userRole === 'ADMIN') return next();

  // silently return null for unauthenticated users
  if (!user) return null;

  if (requiredRoles.length && !requiredRoles.some((role) => role === userRole)) {
    log(
      `Hiding field '${info.parentType.name}.${info.fieldName}' because user roles does not match requested roles [${requiredRoles}]`,
    );
    return null;
  }

  const res = await next();
  // //TODO: maybe use callback to check if user can access resource instead of always using "tenant"
  // if (checkOwner && res?.seller?.id != user?.tenant.id) {
  //   log(
  //     `Hiding field '${info.parentType.name}.${info.fieldName}' because current user is not owner`,
  //   );
  //   return null;
  // }

  return res;
};
