import { UserIdentity } from './user-identity';

export abstract class OtpAuthService<T extends UserIdentity> {
  abstract sendOTP(recipient: T): Promise<void>;

  abstract verifyOTP(recipient: T, code: string): Promise<boolean>;
}
