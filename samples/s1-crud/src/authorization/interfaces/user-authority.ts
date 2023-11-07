import { AppAbility, PermissionAction, PermissionSubjectType } from './types';

export interface UserAuthority {
  getUserAuthorityId(): string;

  can(
    action: PermissionAction,
    subject: PermissionSubjectType,
    condition: any,
  ): boolean;

  ability: AppAbility;
}
