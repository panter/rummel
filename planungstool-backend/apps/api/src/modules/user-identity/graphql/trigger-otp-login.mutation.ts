import { Args, Field, InputType, Mutation } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { IsNotEmpty } from 'class-validator';

import { EntityManager } from '@mikro-orm/postgresql';
import { AuthenticationService, Public } from '@panter/nestjs-utils';

@InputType()
export class TriggerOtpLoginInput {
  @Field()
  @IsNotEmpty()
  email!: string;
}

@Public()
@Injectable()
export class TriggerOtpLoginMutation {
  constructor(
    private readonly em: EntityManager,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Mutation(() => Boolean)
  async triggerOtpLogin(@Args('input') { email }: TriggerOtpLoginInput) {
    return this.authenticationService.triggerOtpLogin(email, 'email');
  }
}
