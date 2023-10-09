import { IsNotEmpty, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';
import { CreateAddressInput } from './create-address.input';

@InputType()
export class UpdateAddressInput extends CreateAddressInput {
  @Field()
  @IsNotEmpty()
  @IsUUID(4)
  id!: string;
}
