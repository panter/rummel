import { Injectable } from '@nestjs/common';
import {
  AppAbility,
  CaslPermission,
  PermissionAction,
  PermissionSubjectType,
} from '../../common/interfaces/authorization/types';
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { UserAuthorityProvider } from '../..//common/interfaces/authorization/user-authority-provider';

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly userAuthorityProvider: UserAuthorityProvider) {}

  async createForUser(user: any): Promise<AppAbility> {
    const { can, build } = new AbilityBuilder<
      Ability<[PermissionAction, PermissionSubjectType]>
    >(Ability as AbilityClass<AppAbility>);
    const caslPermissions: CaslPermission[] =
      await this.userAuthorityProvider.getUserPermissions(user);
    caslPermissions.forEach((permission) =>
      can(permission.action, permission.subject, permission?.condition),
    );
    return build({
      detectSubjectType: (item) => item.constructor.name,
    });
  }
}
