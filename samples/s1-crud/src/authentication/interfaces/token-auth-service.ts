import { UserIdentity } from './user-identity';

export abstract class TokenAuthService<T extends UserIdentity> {
  abstract sendToken(recipient: T): Promise<void>;

  abstract validateToken(recipient: T, token: string): Promise<boolean>;

  abstract validatePersonalToken(recipient: T, token: string): Promise<boolean>;
}
