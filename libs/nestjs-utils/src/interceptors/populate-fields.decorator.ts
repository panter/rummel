import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { RequestContext } from '@mikro-orm/core';
import { InvalidTransactionUsageException } from '../exceptions';
import { getFieldsToPopulate } from '../mikro-orm';

@Injectable()
export class PopulateFieldsInterceptor implements NestInterceptor {
  intercept(
    context: GraphQLExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map(async (data) => {
        if (!data) {
          return null;
        }
        const type = context.getType();
        const info = context.getArgs()[3];
        if (type === 'graphql' && info) {
          const fieldsToPopulate = getFieldsToPopulate(info, data.constructor);
          const em = RequestContext.getEntityManager();
          if (!em) {
            throw new InvalidTransactionUsageException();
          }
          await em.populate(data, fieldsToPopulate);
          return data;
        }
      }),
    );
  }
}
