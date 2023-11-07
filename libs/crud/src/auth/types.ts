import { EntityManager } from '@mikro-orm/postgresql';

export type CrudOperation = 'create' | 'read' | 'update' | 'delete';

export type CrudAuthorizeCallback<T = any> = (
  request: CrudAuthorizationRequest<T>,
) => void | Promise<void>;

export interface CrudAuthorizationRequest<T> {
  operation: CrudOperation;
  resource: string;
  /**
   * New data to be created or updated
   */
  data?: any;
  /*
   * Condition to be used for update and delete operations
   */
  condition?: any;
  request: Express.Request;
  currentUser: T;
  em: EntityManager;
}
