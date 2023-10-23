import { AuthenticatedUser } from '../graphql/types';

export type CrudOperation = 'create' | 'read' | 'update' | 'delete';

export type CrudAuthorizeCallback = (
  operation: CrudOperation,
  resource: string,
  currentUser: AuthenticatedUser,
  data?: any,
) => boolean;

export class CrudAuthorization {
  public static instance?: CrudAuthorization;

  public readonly resources: string[] = [];

  private constructor(public readonly authorize?: CrudAuthorizeCallback) {
    this.authorize = authorize;
  }

  static initialize(authorizeCallback?: CrudAuthorizeCallback) {
    if (!CrudAuthorization.instance) {
      CrudAuthorization.instance = new CrudAuthorization(authorizeCallback);
    }
    return CrudAuthorization.instance;
  }

  static registerResource(resource: string) {
    if (!CrudAuthorization.instance) {
      throw new Error(
        'CrudAuthorization must be initialized before registering resources',
      );
    }
    if (!CrudAuthorization.instance.resources.includes(resource)) {
      CrudAuthorization.instance.resources.push(resource);
    }
  }

  static registerResources(resources: string[]) {
    resources.forEach((resource) =>
      CrudAuthorization.registerResource(resource),
    );
  }
}
