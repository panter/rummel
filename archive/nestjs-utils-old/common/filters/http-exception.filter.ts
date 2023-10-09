import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { GqlContextType } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception.getStatus() >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception, exception.stack);
    }
    if (host.getType<GqlContextType>() !== 'graphql') {
      super.catch(exception, host);
    }
  }
}
