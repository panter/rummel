import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, Logger } from '@nestjs/common';
import {
  CaslPermission,
  UserAuthority,
  UserAuthorityProvider,
} from '../../common';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Injectable()
export class UserAuthorityService implements UserAuthorityProvider {
  private readonly logger = new Logger(UserAuthorityService.name);

  constructor(private readonly em: EntityManager) {}

  getUserPermissions(user: any): Promise<CaslPermission[]> {
    return this.em
      .find(
        Permission,
        {
          roles: { users: { id: user.userAuthority.id } },
        },
        { populate: ['subject'] },
      )
      .then((permissions): CaslPermission[] =>
        permissions.map(
          (permission) =>
            ({
              action: permission.action,
              subject: permission.subject.name,
              condition: Permission.parseCondition(permission.condition, user),
            }) as CaslPermission,
        ),
      );
  }

  async assignToRole(
    userAuthority: UserAuthority,
    roleName: string,
  ): Promise<UserAuthority> {
    const newRole = await this.em.findOneOrFail(Role, { name: roleName });
    userAuthority.updateRole(newRole);
    this.logger.log(
      `UserAuthority ${userAuthority.getUserAuthorityId()} role set to '${
        newRole.name
      }'`,
    );
    return userAuthority;
  }
}
