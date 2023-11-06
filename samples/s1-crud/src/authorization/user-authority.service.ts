import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';

import { Permission } from './permission.entity';
import { CaslPermission, UserAuthority, UserAuthorityProvider } from './interfaces';
import { AppRole } from '../entities/role.entity';

@Injectable()
export class UserAuthorityService implements UserAuthorityProvider {
  private readonly logger = new Logger(UserAuthorityService.name);

  constructor(private readonly em: EntityManager) {}

  async getUserPermissions(user: any): Promise<CaslPermission[]> {
    const permissions = await this.em.find(Permission, {
      roles: { users: { id: user.id } },
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

  async assignToRole(
    userAuthority: UserAuthority,
    roleName: string,
  ): Promise<UserAuthority> {
    const newRole = await this.em.findOneOrFail(AppRole, { name: roleName });
    userAuthority.updateRole(newRole);
    this.logger.log(
      `UserAuthority ${userAuthority.getUserAuthorityId()} role set to '${
        newRole.name
      }'`,
    );
    return userAuthority;
  }
}
