import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { HttpAdapterHost } from '@nestjs/core';
import { ApplicationException } from '../exceptions';
import { GraphQLError } from 'graphql/error';

@Catch(ApplicationException)
export class ApplicationExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApplicationExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(err: ApplicationException, host: ArgumentsHost) {
    if (host.getType<GqlContextType>() === 'graphql') {
      this.handleGraphQLContextException(err);
    } else if (host.getType<GqlContextType>() === 'http') {
      this.handleHttpContextException(host, err);
    } else {
      throw err;
    }
  }

  private handleGraphQLContextException(err: ApplicationException) {
    this.logger.error(err.message, err.stack, {
      ...err.context,
      ...err.internalContext,
    });
    throw new GraphQLError(err.message || 'Internal server error', {
      extensions: {
        code: err.name || 'INTERNAL_SERVER_ERROR',
        context: err.context,
      },
    });
  }

  private handleHttpContextException(
    host: ArgumentsHost,
    err: ApplicationException,
  ) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      err instanceof HttpException
        ? err.getStatus()
        : err.cause instanceof HttpException
        ? err.cause.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      message:
        httpStatus < HttpStatus.INTERNAL_SERVER_ERROR
          ? err.message
          : 'Internal server error',

      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    this.logger.error(err, err.stack);
    if (err.cause && err.cause instanceof Error) {
      this.logger.error(err.cause, err.cause.stack);
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
