import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class TriggerOtpLoginInput {
  @Field()
  @IsNotEmpty()
  email!: string;
}

@InputType()
export class FinishOtpLoginInput {
  @Field()
  @IsNotEmpty()
  email!: string;

  @Field()
  otp!: string;
}
