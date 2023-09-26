import { EntityManager } from '@mikro-orm/postgresql';
import { Info, Query, Resolver } from '@nestjs/graphql';
import {
  CurrentUser,
  FindManyResolver,
  FindOneResolver,
  getFieldsToPopulate,
  Public,
} from '@panter/nestjs-utils';
import { GraphQLResolveInfo } from 'graphql';
import { User } from '../../user-identity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly em: EntityManager) {}

  @Public()
  @Query(() => User, { nullable: true })
  async me(@Info() info: GraphQLResolveInfo, @CurrentUser() currentUser: User) {
    if (!currentUser) return null;
    return this.em.findOne(
      User,
      { id: currentUser?.id },
      { populate: getFieldsToPopulate(info, User) },
    );
  }
}

@Resolver(() => User)
export class UserFindOneResolver extends FindOneResolver(User) {}

@Resolver(() => User)
export class UserFindManyResolver extends FindManyResolver(User) {}
