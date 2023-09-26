import {
  Args,
  Context,
  Field,
  Info,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import {
  AuthenticationService,
  getFieldsToPopulate,
  GqlRequestContext,
  Public,
} from '@panter/nestjs-utils';
import { GraphQLResolveInfo } from 'graphql';
import { EntityManager } from '@mikro-orm/postgresql';
import { User } from '../user.entity';

@InputType()
export class FinishOtpLoginInput {
  @Field()
  @IsNotEmpty()
  email!: string;

  @Field()
  otp!: string;
}

@ObjectType()
export class FinishOtpLoginUserResponse {
  @Field()
  @IsNotEmpty()
  id!: string;
}

@ObjectType()
export class FinishOtpLoginResponse {
  @Field()
  @IsNotEmpty()
  user!: FinishOtpLoginUserResponse;

  @Field()
  access_token!: string;
}

@Public()
@Resolver(FinishOtpLoginResponse)
export class FinishOtpLoginMutation {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly em: EntityManager,
  ) {}

  @Mutation(() => FinishOtpLoginResponse)
  async finishOtpLogin(
    @Args('input') { otp, email }: FinishOtpLoginInput,
    @Context() ctx: GqlRequestContext,
    @Info() info: GraphQLResolveInfo,
  ): Promise<FinishOtpLoginResponse> {
    const user = await this.authenticationService.finishOtpLogin(
      email,
      otp,
      'email',
    );
    const jwt = await this.authenticationService.generateAccessToken(user);
    this.authenticationService.setJwtTokenCookie(jwt, ctx.res);
    if (user instanceof User) {
      await this.em.populate(user, getFieldsToPopulate(info, User));
    }
    //for @CurrentUser decorator used in Resolver
    ctx.req.user = user;

    return {
      user,
      access_token: jwt,
    };
  }
}
