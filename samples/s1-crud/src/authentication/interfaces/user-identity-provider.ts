import { UserIdentity } from './user-identity';

export abstract class UserIdentityProvider<T extends UserIdentity> {
  // extra is used now only to pass payload from jwt.strategy.ts that
  // can be used to if service is only as auth "consumer"
  abstract getUserById(userId: string, extra?: any): Promise<T | null>;

  abstract getUserByPersonalToken(personalToken: string): Promise<T | null>;

  abstract getUserByNaturalKey(
    naturalKey: string,
    extra?: any,
  ): Promise<T | null>;

  abstract createUserIdentity(naturalKey: string): Promise<T>;

  abstract save(user: T): Promise<void>;
}
