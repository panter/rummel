import {
  Args,
  Context,
  Field,
  Info,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { FinishOtpLoginInput, TriggerOtpLoginInput } from './inputs';
import { AuthenticationService } from '../authentication.service';
import { GraphQLResolveInfo } from 'graphql/type';
import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';
import { AutoPopulate, CurrentUser, Public } from '@panter/nestjs-utils';
import { AppUser } from '../app-user.entity';

@ObjectType()
export class FinishOtpLoginResponse {
  @Field()
  @IsNotEmpty()
  userId!: string;

  @Field()
  access_token!: string;
}

@Public()
@Resolver()
export class AuthenticationResolver {
  constructor(private authenticationService: AuthenticationService) {}

  @AutoPopulate()
  @Query(() => AppUser, { nullable: true })
  me(@CurrentUser() user: AppUser) {
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => Boolean)
  async triggerOtpLogin(@Args('input') { email }: TriggerOtpLoginInput) {
    return this.authenticationService.triggerOtpLogin(email);
  }

  @Mutation(() => FinishOtpLoginResponse)
  async finishOtpLogin(
    @Args('input') { otp, email }: FinishOtpLoginInput,
    @Context('res') res: Response,
    @Info() info: GraphQLResolveInfo,
  ): Promise<FinishOtpLoginResponse> {
    const user = await this.authenticationService.finishOtpLogin(email, otp);
    const jwt = await this.authenticationService.generateAccessToken(user);
    this.authenticationService.setJwtTokenCookie(jwt, res);
    return {
      userId: user.id,
      access_token: jwt,
    };
  }
}
