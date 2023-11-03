import {
  Args,
  Context,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { FinishMFALoginInput, TriggerMFALoginInput } from './inputs';
import { AuthenticationService } from '../authentication.service';
import { IsNotEmpty } from 'class-validator';
import { Response } from 'express';
import { AutoPopulate, CurrentUser, Public } from '@panter/nestjs-utils';
import { AppUser } from '../../entities/app-user.entity';
import { UserIdentity } from '../interfaces/user-identity';

@ObjectType()
export class FinishLoginResponse {
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

  @Query(() => AppUser, { nullable: true })
  @AutoPopulate()
  me(@CurrentUser() user: AppUser) {
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => Boolean)
  async triggerMFALogin(@Args('input') { naturalKey }: TriggerMFALoginInput) {
    return this.authenticationService.triggerMFALogin(naturalKey);
  }

  @Mutation(() => FinishLoginResponse)
  async finishMFALogin(
    @Args('input') { token, naturalKey }: FinishMFALoginInput,
    @Context('res') res: Response,
  ): Promise<FinishLoginResponse> {
    const user = await this.authenticationService.finishMFALogin(
      naturalKey,
      token,
    );
    return await this.finishLogin(user, res);
  }

  @Mutation(() => FinishLoginResponse)
  async loginWithPersonalToken(
    @Args('personalToken') personalToken: string,
    @Context('res') res: Response,
  ) {
    const user =
      await this.authenticationService.loginWithPersonalToken(personalToken);
    return await this.finishLogin(user, res);
  }

  private async finishLogin(user: UserIdentity, res: Response) {
    const jwt = await this.authenticationService.generateAccessToken(user);
    this.authenticationService.setJwtTokenCookie(jwt, res);
    return {
      userId: user.id,
      access_token: jwt,
    };
  }
}
