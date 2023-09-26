import { Module } from '@nestjs/common';
import {
  UserFindManyResolver,
  UserFindOneResolver,
  UserResolver,
} from './graphql/user.resolver';
import { UserQueryService } from './user-query.service';
import { UserService } from './user.service';

@Module({
  providers: [
    UserResolver,
    UserQueryService,
    UserService,
    UserFindOneResolver,
    UserFindManyResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
