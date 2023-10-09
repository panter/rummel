import { UserIdentity } from './user-identity';

export abstract class UserIdentityProvider<T extends UserIdentity> {
  // extra is used now only to pass payload from jwt.strategy.ts that
  // can be used to if service is only as auth "consumer"
  abstract getUserIdentity(userId: string, extra?: any): Promise<T | null>;

  abstract getUserIdentityByPhoneNumber(
    phoneNumber: string,
    extra?: any,
  ): Promise<T | null>;

  abstract getUserIdentityByEmail(
    email: string,
    extra?: any,
  ): Promise<T | null>;

  abstract createUserIdentityFromPhoneNumber(phoneNumber: string): Promise<T>;

  abstract createUserIdentityFromEmail(email: string): Promise<T>;

  abstract save(user: T): Promise<void>;
}
