import { Global, Module } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserAuthorityService } from './user-authority.service';
import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { PermissionSubject } from './permission-subject.entity';
import { AuthorizationModule } from './authorization.module';

@Global()
@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [Role, Permission, PermissionSubject],
    }),
    AuthorizationModule.forRootAsync({
      inject: [EntityManager],
      useFactory: (em: EntityManager) => ({
        authorityProvider: new UserAuthorityService(em),
      }),
    }),
  ],
  providers: [UserAuthorityService],
  exports: [UserAuthorityService],
})
export class AuthorizationCoreModule {}
