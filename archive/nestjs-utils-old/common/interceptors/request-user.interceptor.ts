import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { getRequest } from '../graphql';
import { AppStorage } from '../utils/als/storage';
import { UserIdentity } from '../interfaces';

@Injectable()
export class RequestUserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const request: any = getRequest(context);
    const store = AppStorage.getStore<UserIdentity>();
    if (store) {
      store.setUser(request.user);
    }

    return next.handle();
  }
}
