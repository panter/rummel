import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import * as Sentry from '@sentry/node';
import { GqlContextType } from '@nestjs/graphql';
import { getRequest } from '../../common';

@Injectable()
export class SentryErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = getRequest(context);
    return next.handle().pipe(
      catchError((err) => {
        //graphql errors are handled with more details in sentry.plugin.ts
        if (context.getType<GqlContextType>() !== 'graphql') {
          Sentry.captureException(err, { user: request.user });
        }
        return throwError(err);
      }),
    );
  }
}
