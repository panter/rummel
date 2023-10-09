import { AsyncLocalStorage } from 'node:async_hooks';
import { AsyncLocalStorageUnavailableException } from '../../exceptions/async-local-storage-unavailable.exception';

type IdentifiedUser = { id: string };

/**
 * Request context. User relate properties like userId and sellerId are not
 * guaranteed to be available so don't use them in middlewares or interceptor
 */
export class AppStorage<User extends IdentifiedUser> {
  static appStorage = new AsyncLocalStorage<AppStorage<any>>();

  readonly correlationId: string;
  user: User | undefined;
  tenantId: string | undefined;

  constructor(correlationId: string) {
    this.correlationId = correlationId;
  }

  static getStore<User extends IdentifiedUser>(): AppStorage<User> {
    const storage = AppStorage.getAls<User>().getStore();
    if (!storage) {
      throw new AsyncLocalStorageUnavailableException();
    }
    return storage;
  }

  static getAls<User extends IdentifiedUser>(): AsyncLocalStorage<
    AppStorage<User>
  > {
    return AppStorage.appStorage;
  }

  setUser(user: User | undefined) {
    this.user = user;
  }

  setTenantId(tenantId: string | undefined) {
    this.tenantId = tenantId;
  }
}
