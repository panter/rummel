import { CaslPermission } from './types';
import { UserAuthority } from './user-authority';

export abstract class UserAuthorityProvider {
  abstract getUserPermissions(user: UserAuthority): Promise<CaslPermission[]>;
}
