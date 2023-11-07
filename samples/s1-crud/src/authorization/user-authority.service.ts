import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { Permission } from './permission.entity';
import {
  CaslPermission,
  UserAuthority,
  UserAuthorityProvider,
} from './interfaces';

@Injectable()
export class UserAuthorityService implements UserAuthorityProvider {
  // private readonly logger = new Logger(UserAuthorityService.name);

  constructor(private readonly em: EntityManager) {}

  async getUserPermissions(user: UserAuthority): Promise<CaslPermission[]> {
    const permissions = await this.em.find(Permission, {
      roles: { users: { id: user.getUserAuthorityId() } },
    });
    return permissions.map(
      (permission) =>
        ({
          action: permission.action,
          subject: permission.subject,
          condition: Permission.parseCondition(permission.condition, user),
        }) as CaslPermission,
    );
  }

  // async assignToRole(
  //   userAuthority: UserAuthority,
  //   roleName: string,
  // ): Promise<UserAuthority> {
  //   const newRole = await this.em.findOneOrFail(AppRole, { name: roleName });
  //   userAuthority.updateRole(newRole);
  //   this.logger.log(
  //     `UserAuthority ${userAuthority.getUserAuthorityId()} role set to '${
  //       newRole.name
  //     }'`,
  //   );
  //   return userAuthority;
  // }
}
