import { AuthenticatedUser } from '../graphql/types';

export type CrudOperation = 'create' | 'read' | 'update' | 'delete';

export type CrudAuthorizeCallback = (
  request: CrudAuthorizationRequest,
) => boolean;

export interface CrudAuthorizationRequest {
  operation: CrudOperation;
  resource: string;
  currentUser: AuthenticatedUser;
  request: Express.Request;
  data?: any;
}
