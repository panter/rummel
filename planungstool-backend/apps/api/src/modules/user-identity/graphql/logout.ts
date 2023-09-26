import { Injectable } from '@nestjs/common';
import { Context, Info, Mutation } from '@nestjs/graphql';

import {
  AuthenticationService,
  CurrentUser,
  getFieldsToPopulate,
  GqlRequestContext,
} from '@panter/nestjs-utils';
import { EntityManager } from '@mikro-orm/postgresql';
import { GraphQLResolveInfo } from 'graphql';
import { User } from '../user.entity';

@Injectable()
export class LogoutMutation {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly em: EntityManager,
  ) {}

  @Mutation(() => User, { nullable: true })
  async logout(
    @Context() ctx: GqlRequestContext,
    @CurrentUser() user: User,
    @Info() info: GraphQLResolveInfo,
  ) {
    this.authenticationService.logout(ctx.res);
    if (user) {
      await this.em.populate(user, getFieldsToPopulate(info, User));
    }
    return user;
  }
}
