import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { getRequest } from '../graphql';
import { AppStorage } from '../utils/als/storage';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: any = getRequest(context);
    const store = AppStorage.getStore();
    if (store) {
      store.setTenantId(request.user?.tenant?.id);
    }

    return next.handle();
  }
}
