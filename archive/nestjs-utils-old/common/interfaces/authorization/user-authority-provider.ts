import { CaslPermission } from './types';

export abstract class UserAuthorityProvider {
  abstract getUserPermissions(user: string): Promise<CaslPermission[]>;
}
