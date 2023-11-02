import { RequestContext } from '@mikro-orm/core';
import { InvalidTransactionUsageException } from '../exceptions';

export function Transactional() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const em = RequestContext.getEntityManager();
      if (!em) {
        throw new InvalidTransactionUsageException();
      }
      if (em.isInTransaction()) {
        return originalMethod.apply(this, args);
      }
      await em.begin();
      try {
        const res = await originalMethod.apply(this, args);
        await em.commit();
        return res;
      } catch (e) {
        if (em.isInTransaction()) {
          await em.rollback();
        }
        throw e;
      }
    };
  };
}
