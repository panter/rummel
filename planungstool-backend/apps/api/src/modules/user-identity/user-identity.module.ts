import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './user.entity';
import { UserIdentityResolver } from './user-identity.resolver';
import { UserIdentityService } from './user-identity.service';
import { TriggerOtpLoginMutation } from './graphql/trigger-otp-login.mutation';
import { FinishOtpLoginMutation } from './graphql/finish-otp-login.mutation';
import { LogoutMutation } from './graphql/logout';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  providers: [
    UserIdentityResolver,
    UserIdentityService,
    TriggerOtpLoginMutation,
    FinishOtpLoginMutation,
    LogoutMutation,
  ],
})
export class UserIdentityModule {}
