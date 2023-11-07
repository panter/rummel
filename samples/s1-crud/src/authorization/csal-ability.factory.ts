import { Injectable } from '@nestjs/common';
import {
  CaslPermission,
  PermissionAction,
  UserAuthority,
  UserAuthorityProvider,
} from './interfaces';
import { AppAbility, PermissionSubjectType } from './interfaces/types';
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly userAuthorityProvider: UserAuthorityProvider) {}

  async createForUser(user: UserAuthority): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder<
      Ability<[PermissionAction, PermissionSubjectType]>
    >(Ability as AbilityClass<AppAbility>);
    const caslPermissions: CaslPermission[] =
      await this.userAuthorityProvider.getUserPermissions(user);
    caslPermissions.forEach((permission) =>
      can(permission.action, permission.subject, permission?.condition),
    );
    return build({});
  }
}
